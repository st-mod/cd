import type {STDN, STDNUnit, STDNUnitOptions} from 'stdn'
import type {Compiler, UnitCompiler} from '@ddu6/stc'
import {Bezier} from 'bezier-js'
import {observeAdjustments} from 'st-std/dist/observe'
interface Coordinate {
    x: number
    y: number
}
interface Box {
    height: number
    width: number
    top: number
    bottom: number
}
export function angleToD(angle: number): Coordinate {
    return {
        x: Math.cos(angle / 180 * Math.PI),
        y: -Math.sin(angle / 180 * Math.PI)
    }
}
export function dToAngle(d: Coordinate) {
    const angle = Math.acos(d.x) / Math.PI * 180
    if (d.y <= 0) {
        return angle
    }
    return 360 - angle
}
export function getEdgePoint(angle: number, base: Coordinate, box: Box): Coordinate {
    angle = angle % 360
    if (angle < 0) {
        angle += 360
    }
    if (angle === 0) {
        return {
            x: base.x + box.width / 2,
            y: base.y
        }
    }
    if (angle === 180) {
        return {
            x: base.x - box.width / 2,
            y: base.y
        }
    }
    if (angle === 90) {
        return {
            x: base.x,
            y: base.y - box.top
        }
    }
    if (angle === 270) {
        return {
            x: base.x,
            y: base.y + box.bottom
        }
    }
    const k = Math.abs(Math.tan(angle / 180 * Math.PI))
    if (angle < 90) {
        const x = Math.min(box.width / 2, box.top / k)
        const y = Math.min(box.top, box.width * k / 2)
        return {x: base.x + x, y: base.y - y}
    }
    if (angle < 180) {
        const x = Math.min(box.width / 2, box.top / k)
        const y = Math.min(box.top, box.width * k / 2)
        return {x: base.x - x, y: base.y - y}
    }
    if (angle < 270) {
        const x = Math.min(box.width / 2, box.bottom / k)
        const y = Math.min(box.bottom, box.width * k / 2)
        return {x: base.x - x, y: base.y + y}
    }
    const x = Math.min(box.width / 2, box.bottom / k)
    const y = Math.min(box.bottom, box.width * k / 2)
    return {x: base.x + x, y: base.y + y}
}
export function createAbsoluteElement(content: Node) {
    const element = document.createElement('div')
    const centeredBlock = document.createElement('div')
    const baselineBlock = document.createElement('div')
    const container = document.createElement('div')
    element.style.position = 'absolute'
    element.style.top = '0'
    element.style.width = '0'
    element.style.display = 'flex'
    element.style.justifyContent = 'center'
    baselineBlock.style.display = 'inline-block'
    container.style.display = 'inline-block'
    container.style.verticalAlign = '-0.5ex'
    container.style.width = 'max-content'
    element.append(centeredBlock)
    centeredBlock.append(baselineBlock)
    centeredBlock.append(container)
    container.append(content)
    return {
        element,
        baselineBlock,
        container
    }
}
type AbsoluteElement = ReturnType<typeof createAbsoluteElement>
export function absoluteElementToBox(element: AbsoluteElement, heightScale: number, widthScale: number, margin: number): Box {
    const {height, width} = element.container.getBoundingClientRect()
    const scaledHeight = height * heightScale
    const scaledWidth = width * widthScale
    element.baselineBlock.style.height = `${scaledHeight}em`
    const {top: baseTop} = element.baselineBlock.getBoundingClientRect()
    const {top} = element.container.getBoundingClientRect()
    const scaledBottom = Math.min(scaledHeight, (top - baseTop) * heightScale)
    return {
        height: scaledHeight + 2 * margin,
        width: scaledWidth + 2 * margin,
        top: scaledHeight - scaledBottom + margin,
        bottom: scaledBottom + margin
    }
}
export function placeAbsoluteElement(element: AbsoluteElement, coordinate: Coordinate) {
    element.element.style.left = `${coordinate.x}em`
    element.baselineBlock.style.height = `${coordinate.y}em`
}
interface Position {
    row: number
    column: number
}
interface Cell {
    children: STDN
    id: string
}
interface CellElement {
    element: AbsoluteElement
    position: Position
    id: string
}
interface Control {
    angle: number
    strength: number
}
interface Label {
    at: number
    shift: number
    margin: number
    unit: STDNUnit
    id: string
    clear: boolean | string[]
}
type ArrowMark = 'arrow' | 'arrow2' | 'arrow3' | 'bar' | 'bar2' | 'bar3' | 'harpoon' | '-harpoon' | 'hook' | '-hook' | 'loop' | '-loop' | 'tail' | 'two' | 'none'
type ArrowBody = 'one' | 'two' | 'three' | 'squiggle'
interface Arrow {
    from: Position | string
    to: Position | string
    out: Control | undefined
    in: Control | undefined
    bend: Control | undefined
    shift: number
    margin: number
    width: number
    body: ArrowBody
    head: ArrowMark
    tail: ArrowMark
    labels: Label[]
    g: SVGGElement
    clear: boolean | string[]
}
interface MaskData {
    data: {
        type: 'path',
        drawString: string
        width: number
    } | {
        type: 'box'
        x: string
        y: string
        width: string
        height: string
    }
    clear: number | string[],
}
const defaultRowGap = 1.8
const defaultColumnGap = 2.4
const defaultCellMargin = .5
const defaultBendAngle = 30
const squigglePeriod = .5
const defaultArrowWidth = .04
const arrowBigMarkMargin = 4 * defaultArrowWidth
const twoArrowBodyShift = 2.5 * defaultArrowWidth
const defaultArrowMargin = 6 * defaultArrowWidth
const defaultArrowShift = defaultArrowMargin
const defaultLabelMargin = defaultCellMargin
const defaultLabelShift = .8
function parseGap(option: STDNUnitOptions[string]): Position {
    if (typeof option === 'number' && isFinite(option) && option >= 0) {
        return {
            row: option,
            column: option
        }
    }
    if (typeof option !== 'string') {
        return {
            row: defaultRowGap,
            column: defaultColumnGap
        }
    }
    const [column, row] = option.trim().split(/\s+/, 2).map(Number)
    if (isFinite(column) && column >= 0) {
        if (row === undefined) {
            return {
                row: column,
                column
            }
        }
        if (isFinite(row) && row >= 0) {
            return {
                row,
                column
            }
        }
        return {
            row: defaultRowGap,
            column
        }
    }
    if (isFinite(row) && row >= 0) {
        return {
            row,
            column: defaultColumnGap
        }
    }
    return {
        row: defaultRowGap,
        column: defaultColumnGap
    }
}
function parseMargin(option: STDNUnitOptions[string], type: 'cell' | 'arrow' | 'label') {
    if (typeof option === 'number' && isFinite(option) && option >= 0) {
        return option
    }
    if (type === 'cell') {
        return defaultCellMargin
    }
    if (type === 'arrow') {
        return defaultArrowMargin
    }
    return defaultLabelMargin
}
function parsePosition(option: STDNUnitOptions[string], base: Position): Position | string {
    if (typeof option === 'number' && isFinite(option)) {
        return {
            row: base.row,
            column: base.column + option
        }
    }
    if (typeof option !== 'string') {
        return {
            row: base.row,
            column: base.column
        }
    }
    const [dcolumn, drow] = option.trim().split(/\s+/, 2).map(Number)
    if (isFinite(dcolumn) && isFinite(drow)) {
        return {
            row: base.row + drow,
            column: base.column + dcolumn
        }
    }
    return option
}
function parseFromAndTo(from: STDNUnitOptions[string], to: STDNUnitOptions[string], base: Position) {
    if (from === undefined && to === undefined) {
        return {
            from: {
                row: base.row,
                column: base.column
            },
            to: {
                row: base.row,
                column: base.column + 1
            }
        }
    }
    return {
        from: parsePosition(from, base),
        to: parsePosition(to, base)
    }
}
function parseControl(option: STDNUnitOptions[string]): Control | undefined {
    if (typeof option === 'number' && isFinite(option)) {
        return {
            angle: option,
            strength: 1
        }
    }
    if (option === true) {
        return {
            angle: defaultBendAngle,
            strength: 1
        }
    }
    if (option === 'right') {
        return {
            angle: -defaultBendAngle,
            strength: 1
        }
    }
    if (typeof option !== 'string') {
        return undefined
    }
    const [angle, strength] = option.trim().split(/\s+/, 2).map(Number)
    if (isFinite(angle)) {
        if (strength !== undefined && isFinite(strength)) {
            return {
                angle,
                strength
            }
        }
        return {
            angle,
            strength: 1
        }
    }
    return undefined
}
function parseArrowShift(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option)) {
        return option
    }
    if (option === true) {
        return defaultArrowShift
    }
    if (option === 'right') {
        return -defaultArrowShift
    }
    return 0
}
function parseArrowWidth(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option) && option >= 0) {
        return option
    }
    return defaultArrowWidth
}
function parseArrowBody(option: STDNUnitOptions[string]): ArrowBody {
    if (option === 'two' || option === 'three' || option === 'squiggle') {
        return option
    }
    return 'one'
}
function parseArrowMark(option: STDNUnitOptions[string], at: 'head' | 'tail', body: ArrowBody): ArrowMark {
    if (option === 'none') {
        return option
    }
    if (option === 'arrow') {
        return body === 'three' ? 'arrow3' : body === 'two' ? 'arrow2' : option
    }
    if (option === 'bar') {
        return body === 'three' ? 'bar3' : body === 'two' ? 'bar2' : option
    }
    if (option === 'harpoon' || option === '-harpoon' || option === 'hook' || option === '-hook' || option === 'loop' || option === '-loop' || option === 'two' || option === 'tail') {
        return body === 'three' || body === 'two' ? 'none' : option
    }
    return at === 'tail' ? 'none' : body === 'three' ? 'arrow3' : body === 'two' ? 'arrow2' : 'arrow'
}
function parseLabelAt(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && option >= 0 && option <= 1) {
        return option
    }
    return .5
}
function parseLabelShift(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option)) {
        return option
    }
    if (option === 'right') {
        return -defaultLabelShift
    }
    return defaultLabelShift
}
function parseClear(option: STDNUnitOptions[string]): boolean | string[] {
    if (option === true) {
        return option
    }
    if (typeof option === 'string') {
        option = option.trim()
        if (option.length > 0) {
            return option.split(/\s+/)
        }
    }
    return false
}
const harpoon = [
    5.4, 6.5,
    4.8, 3,
    2, 1,
    0, 0
]
const harpoon2 = [
    4, 7,
    2, 3,
    -2, 1,
    -5.5, 0
]
const harpoon3 = [
    1.5, 8,
    -0.5, 2.5,
    -5, 0
]
const harpoon3Line = [
    0, 0,
    -2.5, 0,
    -5, 0
]
const hook = [
    0, 0,
    -4, 0,
    -4, -5,
    0, -5
]
const loop = [
    0, -5,
    3, -5,
    3, 0
]
const loopLine = [
    3, 0,
    3, 2.5,
    3, 5
]
const bar = [
    0, 5,
    0, 0,
    0, -5
]
const bar2 = [
    0, 7.5,
    0, 0,
    0, -7.5
]
const bar3 = [
    0, 10,
    0, 0,
    0, -10
]
export function createArrowMark(mark: ArrowMark, d: Coordinate, base: Coordinate): Bezier[] {
    function rotateAndScaleOne(coordinate: Coordinate): Coordinate {
        return {
            x: base.x + coordinate.x * defaultArrowWidth * d.x - coordinate.y * defaultArrowWidth * d.y,
            y: base.y + coordinate.y * defaultArrowWidth * d.x + coordinate.x * defaultArrowWidth * d.y
        }
    }
    function trans(...coordinates: number[]) {
        const out: number[] = []
        const num = Math.floor(coordinates.length / 2)
        for (let i = 0; i < num; i++) {
            const j = 2 * i
            const {x, y} = rotateAndScaleOne({x: coordinates[j], y: coordinates[j + 1]})
            out.push(x, y)
        }
        return out
    }
    switch (mark) {
        case 'harpoon': return [
            new Bezier(trans(...harpoon))
        ]
        case '-harpoon': return [
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? value : -value)))
        ]
        case 'arrow': return [
            new Bezier(trans(...harpoon)),
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? value : -value)))
        ]
        case 'arrow2': return [
            new Bezier(trans(...harpoon2)),
            new Bezier(trans(...harpoon2.map((value, i) => i % 2 === 0 ? value : -value)))
        ]
        case 'arrow3': return [
            new Bezier(trans(...harpoon3)),
            new Bezier(trans(...harpoon3.map((value, i) => i % 2 === 0 ? value : -value))),
            new Bezier(trans(...harpoon3Line))
        ]
        case 'tail': return [
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? -value : value))),
            new Bezier(trans(...harpoon.map(value => -value)))
        ]
        case 'two': return [
            new Bezier(trans(...harpoon)),
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? value : -value))),
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? value + 4.5 : value))),
            new Bezier(trans(...harpoon.map((value, i) => i % 2 === 0 ? value + 4.5 : -value)))
        ]
        case 'hook': return [
            new Bezier(trans(...hook))
        ]
        case '-hook': return [
            new Bezier(trans(...hook.map((value, i) => i % 2 === 0 ? value : -value)))
        ]
        case 'loop': return [
            new Bezier(trans(...hook)),
            new Bezier(trans(...loop)),
            new Bezier(trans(...loopLine))
        ]
        case '-loop': return [
            new Bezier(trans(...hook.map((value, i) => i % 2 === 0 ? value : -value))),
            new Bezier(trans(...loop.map((value, i) => i % 2 === 0 ? value : -value))),
            new Bezier(trans(...loopLine.map((value, i) => i % 2 === 0 ? value : -value)))
        ]
        case 'bar': return [
            new Bezier(trans(...bar))
        ]
        case 'bar2': return [
            new Bezier(trans(...bar2))
        ]
        case 'bar3': return [
            new Bezier(trans(...bar3))
        ]
        case 'none': return []
    }
}
export function piecesToSquiggle(pieces: Bezier[]): Bezier[] {
    let totalLength = 0
    const parts: {
        length: number
        bezier: Bezier
    }[] = []
    for (const bezier of pieces) {
        const length = bezier.length()
        if (length > 0) {
            totalLength += length
            parts.push({
                length,
                bezier
            })
        }
    }
    if (totalLength < 2 * squigglePeriod || parts.length === 0) {
        return pieces
    }
    const coordinateGap = squigglePeriod / 2
    const coordinateNum = Math.floor(totalLength / coordinateGap) - 1
    const minCoordinateLength = coordinateGap
    const maxCoordinateLength = coordinateNum * coordinateGap
    const out: Bezier[] = []
    let targetCoordinateIndex = 0
    let coordinate: Coordinate | undefined
    let currentLength = 0
    for (const {length, bezier} of parts) {
        const nextLength = currentLength + length
        if (currentLength < minCoordinateLength) {
            if (nextLength <= minCoordinateLength) {
                out.push(bezier)
            } else {
                out.push(bezier.split(0, (minCoordinateLength - currentLength) / length))
            }
        }
        if (targetCoordinateIndex < coordinateNum) {
            while (true) {
                const targetLength = (targetCoordinateIndex + 1) * coordinateGap
                if (targetLength > nextLength) {
                    break
                }
                const newCoordinate = bezier.get((targetLength - currentLength) / length)
                if (coordinate !== undefined) {
                    const dx = newCoordinate.x - coordinate.x
                    const dy = newCoordinate.y - coordinate.y
                    const subLength = Math.sqrt(dx ** 2 + dy ** 2)
                    if (subLength > 0) {
                        const d: Coordinate = {
                            x: dx / subLength,
                            y: dy / subLength
                        }
                        const mid: Coordinate = {
                            x: (coordinate.x + newCoordinate.x) / 2,
                            y: (coordinate.y + newCoordinate.y) / 2
                        }
                        if (targetCoordinateIndex % 2 === 1) {
                            mid.x += d.y * twoArrowBodyShift
                            mid.y -= d.x * twoArrowBodyShift
                        } else {
                            mid.x -= d.y * twoArrowBodyShift
                            mid.y += d.x * twoArrowBodyShift
                        }
                        out.push(new Bezier(coordinate.x, coordinate.y, (coordinate.x + mid.x) / 2, (coordinate.y + mid.y) / 2, mid.x, mid.y))
                        out.push(new Bezier(mid.x, mid.y, (mid.x + newCoordinate.x) / 2, (mid.y + newCoordinate.y) / 2, newCoordinate.x, newCoordinate.y))
                    }
                }
                coordinate = newCoordinate
                targetCoordinateIndex++
                if (targetCoordinateIndex === coordinateNum) {
                    break
                }
            }
        }
        if (nextLength > maxCoordinateLength) {
            if (currentLength >= maxCoordinateLength) {
                out.push(bezier)
            } else {
                out.push(bezier.split((maxCoordinateLength - currentLength) / length, 1))
            }
        }
        currentLength = nextLength
    }
    return out
}
interface BaseIdToCount {
    [key: string]: number | undefined
}
function createId(baseString: string, baseIdToCount: BaseIdToCount, compiler: Compiler) {
    const baseId = compiler.base.stringToId(baseString)
    const count = baseIdToCount[baseId] = (baseIdToCount[baseId] ?? 0) + 1
    return count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId
}
interface ExtractLabelsOptions {
    labelMarginOption: STDNUnitOptions[string]
}
function extractLabels(children: STDN, tag: string, baseIdToCount: BaseIdToCount, compiler: Compiler, options: ExtractLabelsOptions) {
    const labels: Label[] = []
    const main: STDNUnit = {
        tag: tag === 'katex' ? tag : 'div',
        options: {},
        children: []
    }
    for (const line of children) {
        if (line.length === 0) {
            main.children.push(line)
            continue
        }
        const first = line[0]
        if (typeof first === 'string') {
            main.children.push(line)
            continue
        }
        let {at, shift, margin} = first.options
        let baseString = first.options['cd-id']
        if (at !== undefined || shift !== undefined || margin !== undefined || baseString !== undefined) {
            if (typeof baseString !== 'string') {
                baseString = compiler.base.unitToInlinePlainString(first)
            }
            labels.push({
                at: parseLabelAt(at),
                shift: parseLabelShift(shift),
                margin: parseMargin(margin ?? options.labelMarginOption, 'label'),
                unit: first,
                id: createId(baseString, baseIdToCount, compiler),
                clear: parseClear(first.options.clear)
            })
            continue
        }
        main.children.push(line)
    }
    if (main.children.length > 0) {
        const baseString = compiler.base.unitToInlinePlainString(main)
        labels.push({
            at: .5,
            shift: defaultLabelShift,
            margin: parseMargin(options.labelMarginOption, 'label'),
            unit: main,
            id: createId(baseString, baseIdToCount, compiler),
            clear: false
        })
    }
    return labels
}
interface IdSet {
    [key: string]: true | undefined
}
interface ExtractCellElementsOptions extends ExtractLabelsOptions {
    katex: boolean
    arrowMarginOption: STDNUnitOptions[string]
    arrowWidthOption: STDNUnitOptions[string]
}
async function extractCellElements(children: STDN, svg: SVGSVGElement, compiler: Compiler, options: ExtractCellElementsOptions) {
    let cell: Cell = {
        children: [],
        id: ''
    }
    let row = [cell]
    const table = [row]
    const arrows: Arrow[] = []
    const baseIdToCount: BaseIdToCount = {}
    for (const line of children) {
        if (line.length === 0) {
            cell.children.push(line)
            continue
        }
        main: {
            const first = line[0]
            if (typeof first === 'string') {
                if (first === '&' && line.length === 1) {
                    row.push(cell = {
                        children: [],
                        id: ''
                    })
                    continue
                }
                if (first === '\\' && line.length === 2 && line[1] === '\\') {
                    table.push(row = [cell = {
                        children: [],
                        id: ''
                    }])
                    continue
                }
                break main
            }
            if (first.tag === 'ar' || first.tag === 'katex' && first.options.ar === true) {
                const base: Position = {
                    row: table.length - 1,
                    column: row.length - 1
                }
                const {from, to} = parseFromAndTo(first.options.from, first.options.to, base)
                const body = parseArrowBody(first.options.body)
                const labels = extractLabels(first.children, first.tag, baseIdToCount, compiler, options)
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
                if (typeof first.options.class === 'string' && first.options.class.length > 0) {
                    try {
                        g.setAttribute('class', first.options.class)
                    } catch (err) {
                        console.log(err)
                    }
                }
                if (typeof first.options.style === 'string' && first.options.style.length > 0) {
                    try {
                        g.setAttribute('style', first.options.style)
                    } catch (err) {
                        console.log(err)
                    }
                }
                if (typeof first.options.slide === 'string' && first.options.slide.length > 0) {
                    try {
                        g.dataset.slide = first.options.slide
                    } catch (err) {
                        console.log(err)
                    }
                }
                svg.append(g)
                arrows.push({
                    from,
                    to,
                    out: parseControl(first.options.out),
                    in: parseControl(first.options.in),
                    bend: parseControl(first.options.bend),
                    shift: parseArrowShift(first.options.shift),
                    margin: parseMargin(first.options.margin ?? options.arrowMarginOption, 'arrow'),
                    width: parseArrowWidth(first.options.width ?? options.arrowWidthOption),
                    body,
                    head: parseArrowMark(first.options.head, 'head', body),
                    tail: parseArrowMark(first.options.tail, 'tail', body),
                    labels,
                    g,
                    clear: parseClear(first.options.clear)
                })
                continue
            }
        }
        cell.children.push(line)
        if (cell.id.length === 0) {
            const baseString = compiler.base.lineToInlinePlainString(line)
            if (baseString.length > 0) {
                cell.id = createId(baseString, baseIdToCount, compiler)
            }
        }
    }
    const idSet: IdSet = {}
    const cellElements: CellElement[] = []
    for (let i = 0; i < table.length; i++) {
        const row = table[i]
        for (let j = 0; j < row.length; j++) {
            const {children, id} = row[j]
            if (children.length === 0) {
                continue
            }
            const element = createAbsoluteElement(options.katex ? await compiler.compileUnit({
                tag: 'katex',
                options: {},
                children
            }) : await compiler.compileSTDN(children))
            svg.after(element.element)
            cellElements.push({
                element,
                position: {
                    row: i,
                    column: j
                },
                id
            })
            if (id.length > 0) {
                idSet[id] = true
            }
        }
    }
    return {
        cellElements,
        arrows,
        idSet
    }
}
async function orderArrows(arrows: Arrow[], idSet: IdSet, svg: SVGSVGElement, compiler: Compiler) {
    const idToLabelElement: IdToLabelElement = {}
    const orderedArrows: Arrow[] = []
    let remainingArrows = arrows
    while (true) {
        const newRemainingArrows: Arrow[] = []
        for (const arrow of remainingArrows) {
            const {from, to} = arrow
            if (typeof from === 'string') {
                if (!idSet[from]) {
                    newRemainingArrows.push(arrow)
                    continue
                }
            }
            if (typeof to === 'string') {
                if (!idSet[to]) {
                    newRemainingArrows.push(arrow)
                    continue
                }
            }
            orderedArrows.push(arrow)
            for (const {unit, id} of arrow.labels) {
                const element = createAbsoluteElement(await compiler.compileUnit(unit))
                svg.after(element.element)
                if (unit.options['normal-font-size'] !== true) {
                    element.container.style.fontSize = 'var(--length-font-code)'
                }
                idToLabelElement[id] = element
                idSet[id] = true
            }
        }
        if (remainingArrows.length === newRemainingArrows.length) {
            break
        }
        remainingArrows = newRemainingArrows
    }
    return {
        orderedArrows,
        idToLabelElement
    }
}
type RowHeights = ({
    top: number
    bottom: number
} | undefined)[]
type ColumnWidths = (number | undefined)[]
function getCoordinateX(column: number, columnWidths: ColumnWidths, gap: number): number {
    let x = column >= 0 ? (columnWidths[0] ?? 0) / 2 : 0
    for (let i = 1; i <= column; i++) {
        const right = columnWidths[i - 1]
        const left = columnWidths[i]
        if (right !== undefined) {
            x += right / 2
            if (left !== undefined) {
                x += gap
            }
        }
        if (left !== undefined) {
            x += left / 2
        }
    }
    if (column % 1 !== 0) {
        const i = Math.floor(column)
        const right = columnWidths[i]
        const left = columnWidths[i + 1]
        if (right !== undefined) {
            x += (column - i) * right / 2
            if (left !== undefined) {
                x += (column - i) * gap
            }
        }
        if (left !== undefined) {
            x += (column - i) * left / 2
        }
    }
    return x
}
function getCoordinateY(row: number, rowHeights: RowHeights, gap: number): number {
    let y = 0
    if (row >= 0) {
        const firstRowHeight = rowHeights[0]
        if (firstRowHeight !== undefined) {
            y = firstRowHeight.top
        }
    }
    for (let i = 1; i <= row; i++) {
        const bottom = rowHeights[i - 1]
        const top = rowHeights[i]
        if (bottom !== undefined) {
            y += bottom.bottom
            if (top !== undefined) {
                y += gap
            }
        }
        if (top !== undefined) {
            y += top.top
        }
    }
    if (row % 1 !== 0) {
        const i = Math.floor(row)
        const bottom = rowHeights[i]
        const top = rowHeights[i + 1]
        if (bottom !== undefined) {
            y += (row - i) * bottom.bottom
            if (top !== undefined) {
                y += (row - i) * gap
            }
        }
        if (top !== undefined) {
            y += (row - i) * top.top
        }
    }
    return y
}
function getCoordinate({row, column}: Position, rowHeights: RowHeights, columnWidths: ColumnWidths, gap: Position): Coordinate {
    return {
        x: getCoordinateX(column, columnWidths, gap.column),
        y: getCoordinateY(row, rowHeights, gap.row)
    }
}
interface IdToLabelElement {
    [key: string]: AbsoluteElement | undefined
}
interface DrawOptions {
    gap: Position
    cellMargin: number
}
function draw(cellElements: CellElement[], orderedArrows: Arrow[], idToLabelElement: IdToLabelElement, svg: SVGSVGElement, element: HTMLDivElement, {gap, cellMargin}: DrawOptions) {
    svg.innerHTML = ''
    const rowHeights: RowHeights = []
    const columnWidths: ColumnWidths = []
    const fontSize = Number(getComputedStyle(element).fontSize.slice(0, -2))
    let heightScale = 1 / fontSize
    let widthScale = 1 / fontSize
    const fo = element.closest('foreignObject')
    if (fo !== null) {
        const {height, width} = fo.getBoundingClientRect()
        heightScale *= fo.height.animVal.value / height
        widthScale *= fo.width.animVal.value / width
    }
    if (!isFinite(heightScale) || !isFinite(widthScale)) {
        return false
    }
    const positionToBox: {
        [key: string]: Box | undefined
    } = {}
    const idToBox: {
        [key: string]: Box | undefined
    } = {}
    for (const {element, position, id} of cellElements) {
        const box = absoluteElementToBox(element, heightScale, widthScale, cellMargin)
        positionToBox[`${position.row} ${position.column}`] = box
        if (id.length > 0) {
            idToBox[id] = box
        }
        const rowHeight = rowHeights[position.row]
        if (rowHeight === undefined) {
            rowHeights[position.row] = {
                top: box.top,
                bottom: box.bottom
            }
        } else {
            if (rowHeight.top < box.top) {
                rowHeight.top = box.top
            }
            if (rowHeight.bottom < box.bottom) {
                rowHeight.bottom = box.bottom
            }
        }
        if ((columnWidths[position.column] ?? 0) < box.width) {
            columnWidths[position.column] = box.width
        }
    }
    const idToCoordinate: {
        [key: string]: Coordinate | undefined
    } = {}
    for (const {position, id} of cellElements) {
        const coordinate = getCoordinate(position, rowHeights, columnWidths, gap)
        if (id.length > 0) {
            idToCoordinate[id] = coordinate
        }
    }
    const textCenter = getCoordinateY(rowHeights.length - 1, rowHeights, gap.row)
    let xmin = 0
    let ymin = 0
    let xmax = getCoordinateX(columnWidths.length, columnWidths, gap.column)
    let ymax = getCoordinateY(rowHeights.length, rowHeights, gap.row)
    function drawPieces(pieces: Bezier[], width: number, g: SVGGElement, classStr?: string) {
        const drawArray: string[] = []
        for (const piece of pieces) {
            drawArray.push(piece.toSVG())
            const {x, y} = piece.bbox()
            const xmin0 = x.min - width / 2
            const xmax0 = x.max + width / 2
            const ymin0 = y.min - width / 2
            const ymax0 = y.max + width / 2
            if (xmin0 < xmin) {
                xmin = xmin0
            }
            if (xmax0 > xmax) {
                xmax = xmax0
            }
            if (ymin0 < ymin) {
                ymin = ymin0
            }
            if (ymax0 > ymax) {
                ymax = ymax0
            }
        }
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', drawArray.join(' '))
        path.style.strokeWidth = `${width}px`
        path.style.fill = 'none'
        if (classStr !== undefined) {
            try {
                path.setAttribute('class', classStr)
            } catch (err) {
                console.log(err)
            }
        }
        g.append(path)
        return drawArray
    }
    function drawBezier(bezier: Bezier, width: number, shift: number, g: SVGGElement, classStr?: string) {
        const pieces = bezier.offset(-shift)
        if (Array.isArray(pieces)) {
            return drawPieces(pieces, width, g, classStr)
        }
        return []
    }
    function drawBezierToSquiggle(bezier: Bezier, width: number, shift: number, g: SVGGElement, classStr?: string) {
        const pieces = bezier.offset(-shift)
        if (Array.isArray(pieces)) {
            return drawPieces(piecesToSquiggle(pieces), width, g, classStr)
        }
        return []
    }
    const appendedArrows: SVGGElement[] = []
    const masks: (SVGMaskElement | undefined)[] = []
    const maskRects: SVGRectElement[] = []
    function addMask({data, clear}: MaskData) {
        for (let i = 0; i < appendedArrows.length; i++) {
            const arrow = appendedArrows[i]
            check: if (typeof clear !== 'number') {
                for (const className of clear) {
                    if (arrow.classList.contains(className)) {
                        break check
                    }
                }
                continue
            } else if (i >= clear) {
                break
            }
            let mask = masks[i]
            if (mask === undefined) {
                mask = masks[i] = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                rect.style.fill = 'white'
                svg.append(mask)
                mask.append(rect)
                maskRects.push(rect)
                const id = Math.random().toString()
                mask.id = id
                arrow.style.mask = `url(#${id})`
            }
            if (data.type === 'path') {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                path.style.strokeWidth = `${data.width}px`
                path.style.stroke = 'black'
                path.style.fill = 'none'
                path.setAttribute('d', data.drawString)
                mask.append(path)
                continue
            }
            const black = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            black.style.stroke = 'none'
            black.style.fill = 'black'
            black.setAttribute('x', data.x)
            black.setAttribute('y', data.y)
            black.setAttribute('width', data.width)
            black.setAttribute('height', data.height)
            mask.append(black)
        }
    }
    const maskDataArray: MaskData[] = []
    for (const {from, to, out, in: arrowIn, bend, head, tail, shift, body, g, labels, clear, margin, width} of orderedArrows) {
        let fromCoordinate: Coordinate
        let toCoordinate: Coordinate
        let fromBox: Box
        let toBox: Box
        if (typeof from !== 'string') {
            fromCoordinate = getCoordinate(from, rowHeights, columnWidths, gap)
            const box = positionToBox[`${from.row} ${from.column}`]
            if (box === undefined) {
                fromBox = {height: 0, width: 0, top: 0, bottom: 0}
            } else {
                fromBox = box
            }
        } else {
            const coordinate = idToCoordinate[from]
            const box = idToBox[from]
            if (coordinate === undefined || box === undefined) {
                continue
            }
            fromCoordinate = coordinate
            fromBox = box
        }
        if (typeof to !== 'string') {
            toCoordinate = getCoordinate(to, rowHeights, columnWidths, gap)
            const box = positionToBox[`${to.row} ${to.column}`]
            if (box === undefined) {
                toBox = {height: 0, width: 0, top: 0, bottom: 0}
            } else {
                toBox = box
            }
        } else {
            const coordinate = idToCoordinate[to]
            const box = idToBox[to]
            if (coordinate === undefined || box === undefined) {
                continue
            }
            toCoordinate = coordinate
            toBox = box
        }
        let start: Coordinate
        let end: Coordinate
        let startD: Coordinate
        let endD: Coordinate
        let startStrength: number
        let endStrength: number
        if (out === undefined || arrowIn === undefined) {
            const dx = toCoordinate.x - fromCoordinate.x
            const dy = toCoordinate.y - fromCoordinate.y
            const length = Math.sqrt(dx ** 2 + dy ** 2)
            if (length === 0) {
                continue
            }
            const angle = dToAngle({x: dx / length, y: dy / length})
            let bendAngle = 0
            let bendStrength = 1
            if (bend !== undefined) {
                bendAngle = bend.angle
                bendStrength = bend.strength
            }
            if (out === undefined) {
                const startAngle = angle + bendAngle
                start = getEdgePoint(startAngle, fromCoordinate, fromBox)
                startD = angleToD(startAngle)
                startStrength = bendStrength
            } else {
                start = getEdgePoint(out.angle, fromCoordinate, fromBox)
                startD = angleToD(out.angle)
                startStrength = out.strength
            }
            if (arrowIn === undefined) {
                const endAngle = angle + 180 - bendAngle
                end = getEdgePoint(endAngle, toCoordinate, toBox)
                endD = angleToD(endAngle)
                endStrength = bendStrength
            } else {
                end = getEdgePoint(arrowIn.angle, toCoordinate, toBox)
                endD = angleToD(arrowIn.angle)
                endStrength = arrowIn.strength
            }
        } else {
            start = getEdgePoint(out.angle, fromCoordinate, fromBox)
            end = getEdgePoint(arrowIn.angle, toCoordinate, toBox)
            startD = angleToD(out.angle)
            endD = angleToD(arrowIn.angle)
            startStrength = out.strength
            endStrength = arrowIn.strength
        }
        if (head === 'arrow2' || head === 'arrow3' || head === 'hook' || head === '-hook' || head === 'loop' || head === '-loop' || head === 'tail') {
            end.x = end.x + endD.x * arrowBigMarkMargin
            end.y = end.y + endD.y * arrowBigMarkMargin
        }
        if (tail === 'arrow2' || tail === 'arrow3' || tail === 'hook' || tail === '-hook' || tail === 'loop' || tail === '-loop' || tail === 'tail') {
            start.x = start.x + startD.x * arrowBigMarkMargin
            start.y = start.y + startD.y * arrowBigMarkMargin
        }
        const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
        if (length === 0) {
            continue
        }
        const startControl: Coordinate = {
            x: start.x + startD.x * length / 3 * startStrength,
            y: start.y + startD.y * length / 3 * startStrength
        }
        const endControl: Coordinate = {
            x: end.x + endD.x * length / 3 * endStrength,
            y: end.y + endD.y * length / 3 * endStrength
        }
        const bezier = new Bezier(start.x, start.y, startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y)
        g.innerHTML = ''
        svg.append(g)
        const drawArray: string[] = []
        let mayEmpty = false
        if (body === 'three') {
            drawArray.push(...drawBezier(bezier, width, shift + 2 * twoArrowBodyShift, g, 'body'))
            drawArray.push(...drawBezier(bezier, width, shift, g, 'body'))
            drawArray.push(...drawBezier(bezier, width, shift - 2 * twoArrowBodyShift, g, 'body'))
        } else if (body === 'two') {
            drawArray.push(...drawBezier(bezier, width, shift + twoArrowBodyShift, g, 'body'))
            drawArray.push(...drawBezier(bezier, width, shift - twoArrowBodyShift, g, 'body'))
        } else if (body === 'squiggle') {
            drawArray.push(...drawBezierToSquiggle(bezier, width, shift, g, 'body'))
        } else {
            drawArray.push(...drawBezier(bezier, width, shift, g, 'body'))
            mayEmpty = true
        }
        {
            const base: Coordinate = {
                x: end.x - endD.y * shift,
                y: end.y + endD.x * shift
            }
            const pieces = createArrowMark(head, endD, base)
            if (pieces.length > 0) {
                drawArray.push(...drawPieces(pieces, width, g, 'head'))
                mayEmpty = false
            }
        }
        {
            const base: Coordinate = {
                x: start.x + startD.y * shift,
                y: start.y - startD.x * shift
            }
            const pieces = createArrowMark(tail, startD, base)
            if (pieces.length > 0) {
                drawArray.push(...drawPieces(pieces, width, g, 'tail'))
                mayEmpty = false
            }
        }
        if (clear !== false && drawArray.length > 0) {
            maskDataArray.push({
                data: {
                    type: 'path',
                    drawString: drawArray.join(' '),
                    width: 2 * margin + width
                },
                clear: clear === true ? appendedArrows.length : clear
            })
        }
        if (mayEmpty) {
            const placeHolder = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            placeHolder.setAttribute('x', '0')
            placeHolder.setAttribute('y', '0')
            placeHolder.setAttribute('width', width.toString())
            placeHolder.setAttribute('height', width.toString())
            placeHolder.style.stroke = placeHolder.style.fill = 'none'
            g.append(placeHolder)
        }
        appendedArrows.push(g)
        for (const {at, shift: labelShift, id, clear, margin} of labels) {
            const root = bezier.get(at)
            const normal = bezier.normal(at)
            let allShift = shift + labelShift
            if (labelShift !== 0) {
                if (body === 'three') {
                    allShift += 2 * twoArrowBodyShift * Math.sign(labelShift)
                } else if (body === 'two' || body === 'squiggle') {
                    allShift += twoArrowBodyShift * Math.sign(labelShift)
                }
            }
            const base: Coordinate = {
                x: root.x - normal.x * allShift,
                y: root.y - normal.y * allShift
            }
            idToCoordinate[id] = base
            const labelElement = idToLabelElement[id]
            if (labelElement === undefined) {
                throw new Error()
            }
            const box = absoluteElementToBox(labelElement, heightScale, widthScale, margin)
            idToBox[id] = box
            const xmin0 = base.x - box.width / 2
            const xmax0 = base.x + box.width / 2
            const ymin0 = base.y - box.top
            const ymax0 = base.y + box.bottom
            if (xmin0 < xmin) {
                xmin = xmin0
            }
            if (xmax0 > xmax) {
                xmax = xmax0
            }
            if (ymin0 < ymin) {
                ymin = ymin0
            }
            if (ymax0 > ymax) {
                ymax = ymax0
            }
            if (clear !== false) {
                maskDataArray.push({
                    data: {
                        type: 'box',
                        x: xmin0.toString(),
                        y: ymin0.toString(),
                        width: box.width.toString(),
                        height: box.height.toString()
                    },
                    clear: clear === true ? appendedArrows.length : clear
                })
            }
        }
    }
    maskDataArray.forEach(addMask)
    const width = xmax - xmin
    const height = ymax - ymin
    element.style.width = svg.style.width = `${width}em`
    element.style.height = svg.style.height = `${height}em`
    element.style.verticalAlign = `calc(${textCenter - ymax}em + 0.5ex)`
    svg.setAttribute('viewBox', `${xmin} ${ymin} ${width} ${height}`)
    for (const {element, position} of cellElements) {
        const coordinate = getCoordinate(position, rowHeights, columnWidths, gap)
        placeAbsoluteElement(element, {
            x: coordinate.x - xmin,
            y: coordinate.y - ymin
        })
    }
    for (const id in idToLabelElement) {
        const labelElement = idToLabelElement[id]
        const base = idToCoordinate[id]
        if (labelElement === undefined || base === undefined) {
            continue
        }
        placeAbsoluteElement(labelElement, {
            x: base.x - xmin,
            y: base.y - ymin
        })
    }
    for (const rect of maskRects) {
        rect.setAttribute('x', xmin.toString())
        rect.setAttribute('y', ymin.toString())
        rect.setAttribute('width', width.toString())
        rect.setAttribute('height', height.toString())
    }
    return true
}
export const cd: UnitCompiler = async (unit, compiler) => {
    const gap = parseGap(unit.options.gap ?? compiler.context.extractLastGlobalOption('gap', 'cd'))
    const cellMargin = parseMargin(unit.options['cell-margin'] ?? compiler.context.extractLastGlobalOption('cell-margin', 'cd'), 'cell')
    const element = document.createElement('div')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    element.classList.add('cd')
    element.style.position = 'relative'
    svg.style.position = 'absolute'
    svg.style.left = '0'
    svg.style.top = '0'
    element.append(svg)
    const {cellElements, arrows, idSet} = await extractCellElements(unit.children, svg, compiler, {
        katex: unit.tag === 'CD',
        arrowMarginOption: unit.options['arrow-margin'] ?? compiler.context.extractLastGlobalOption('arrow-margin', 'cd'),
        arrowWidthOption: unit.options['arrow-width'] ?? compiler.context.extractLastGlobalOption('arrow-width', 'cd'),
        labelMarginOption: unit.options['label-margin'] ?? compiler.context.extractLastGlobalOption('label-margin', 'cd')
    })
    const {orderedArrows, idToLabelElement} = await orderArrows(arrows, idSet, svg, compiler)
    observeAdjustments(async () => {
        return draw(cellElements, orderedArrows, idToLabelElement, svg, element, {gap, cellMargin})
    }, element, compiler.context.root)
    return element
}
export const CD = cd