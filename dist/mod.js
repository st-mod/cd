import { stdnToInlinePlainString, stringToId } from '@ddu6/stc';
import { Bezier } from 'bezier-js';
const arrowWidth = .04;
const arrowBigMarkMargin = 4 * arrowWidth;
const twoArrowBodyShift = 2.5 * arrowWidth;
const defaultLabelShift = .6;
const defaultArrowShift = 6 * arrowWidth;
const defaultRowGap = 1.8;
const defaultColumnGap = 2.4;
const cellMargin = .5;
const labelMargin = .3;
export function parseGap(option) {
    if (typeof option === 'number' && isFinite(option)) {
        return {
            row: option,
            column: option
        };
    }
    if (typeof option === 'string') {
        let [column, row] = option.split(/\s+/, 2).map(Number);
        if (!isFinite(column)) {
            column = defaultColumnGap;
        }
        if (!isFinite(row)) {
            row = defaultRowGap;
        }
        return {
            row,
            column
        };
    }
    return {
        row: defaultRowGap,
        column: defaultColumnGap
    };
}
export function parsePosition(option, at, base) {
    if (typeof option === 'number' && isFinite(option)) {
        return {
            row: base.row,
            column: base.column + option
        };
    }
    if (typeof option !== 'string') {
        if (at === 'from') {
            return {
                row: base.row,
                column: base.column
            };
        }
        return {
            row: base.row,
            column: base.column + 1
        };
    }
    const [dcolumn, drow] = option.split(/\s+/, 2).map(val => Number(val ?? 0));
    if (isFinite(dcolumn) && isFinite(drow)) {
        return {
            row: base.row + drow,
            column: base.column + dcolumn
        };
    }
    return option;
}
export function parseControl(option) {
    if (typeof option === 'number' && isFinite(option)) {
        return {
            angle: option,
            strength: 1
        };
    }
    if (typeof option !== 'string') {
        return undefined;
    }
    let [angle, strength] = option.split(/\s+/, 2).map(Number);
    if (!isFinite(angle)) {
        angle = 0;
    }
    if (!isFinite(strength)) {
        strength = 1;
    }
    return {
        angle,
        strength
    };
}
export function parseArrowShift(option) {
    if (typeof option === 'number' && isFinite(option)) {
        return option;
    }
    if (option === true) {
        return defaultArrowShift;
    }
    return 0;
}
export function parseArrowBody(option) {
    if (option === 'two') {
        return option;
    }
    return 'one';
}
export function parseArrowMark(option, at, body) {
    if (option === 'none') {
        return option;
    }
    if (option === 'bar') {
        return body === 'two' ? 'Bar' : option;
    }
    if (option === 'harpoon' || option === 'harpoon-' || option === 'hook' || option === 'hook-' || option === 'two' || option === 'tail') {
        return body === 'two' ? 'none' : option;
    }
    return at === 'tail' ? 'none' : body === 'two' ? 'Arrow' : 'arrow';
}
export function extractLabels(unit, baseIdToCount) {
    const labels = [];
    const main = {
        tag: unit.tag === 'katex' ? unit.tag : 'div',
        options: {},
        children: []
    };
    for (const line of unit.children) {
        if (line.length === 0) {
            main.children.push(line);
            continue;
        }
        const first = line[0];
        if (typeof first === 'string') {
            main.children.push(line);
            continue;
        }
        let { at, shift } = first.options;
        if (at !== undefined || shift !== undefined) {
            if (typeof at !== 'number' || at < 0 || at > 1) {
                at = .5;
            }
            if (typeof shift !== 'number' || !isFinite(shift)) {
                shift = defaultLabelShift;
            }
            let baseId = first.options['cd-id'];
            if (typeof baseId !== 'string') {
                baseId = stdnToInlinePlainString(first.children);
            }
            baseId = stringToId(baseId);
            const count = baseIdToCount[baseId] = (baseIdToCount[baseId] ?? 0) + 1;
            const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId;
            labels.push({
                at,
                shift,
                unit: first,
                id
            });
            continue;
        }
        main.children.push(line);
    }
    let baseId = unit.options['cd-id'];
    if (typeof baseId !== 'string') {
        baseId = stdnToInlinePlainString(main.children);
    }
    baseId = stringToId(baseId);
    if (main.children.length > 0 || baseId.length > 0) {
        const count = baseIdToCount[baseId] = (baseIdToCount[baseId] ?? 0) + 1;
        const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId;
        labels.push({
            at: .5,
            shift: defaultLabelShift,
            unit: main,
            id
        });
    }
    return labels;
}
export function angleToD(angle) {
    return {
        x: Math.cos(angle / 180 * Math.PI),
        y: -Math.sin(angle / 180 * Math.PI)
    };
}
export function dToAngle(d) {
    const angle = Math.acos(d.x) / Math.PI * 180;
    if (d.y <= 0) {
        return angle;
    }
    return 360 - angle;
}
export function getEdgePoint(angle, base, box) {
    angle = angle % 360;
    if (angle < 0) {
        angle += 360;
    }
    if (angle === 0) {
        return {
            x: base.x + box.width / 2,
            y: base.y
        };
    }
    if (angle === 180) {
        return {
            x: base.x - box.width / 2,
            y: base.y
        };
    }
    if (angle === 90) {
        return {
            x: base.x,
            y: base.y - box.height / 2
        };
    }
    if (angle === 270) {
        return {
            x: base.x,
            y: base.y + box.height / 2
        };
    }
    const k = Math.abs(Math.tan(angle / 180 * Math.PI));
    const x = Math.min(box.width, box.height / k) / 2;
    const y = Math.min(box.height, box.width * k) / 2;
    if (angle < 90) {
        return { x: base.x + x, y: base.y - y };
    }
    if (angle < 180) {
        return { x: base.x - x, y: base.y - y };
    }
    if (angle < 270) {
        return { x: base.x - x, y: base.y + y };
    }
    return { x: base.x + x, y: base.y + y };
}
const harpoon = [5.4, 6.5, 4.8, 3, 2, 1, 0, 0];
const Harpoon = [4.5, 7.5, 3, 4.5, -1.5, 1, -4.5, 0];
const hook = [0, 0, -6, 0, -6, -5, 0, -5];
const bar = [0, 5, 0, 0, 0, -5];
const Bar = [0, 7.5, 0, 0, 0, -7.5];
export function createArrowMark(mark, d, base) {
    function rotateCoordinate(coordinate) {
        return {
            x: base.x + coordinate.x * arrowWidth * d.x - coordinate.y * arrowWidth * d.y,
            y: base.y + coordinate.y * arrowWidth * d.x + coordinate.x * arrowWidth * d.y
        };
    }
    function rotateCoordinates(...coordinates) {
        const out = [];
        const num = Math.floor(coordinates.length / 2);
        for (let i = 0; i < num; i++) {
            const j = 2 * i;
            const { x, y } = rotateCoordinate({ x: coordinates[j], y: coordinates[j + 1] });
            out.push(x, y);
        }
        return out;
    }
    switch (mark) {
        case 'harpoon': return [
            new Bezier(rotateCoordinates(...harpoon))
        ];
        case 'harpoon-': return [
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? val : -val)))
        ];
        case 'arrow': return [
            new Bezier(rotateCoordinates(...harpoon)),
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? val : -val)))
        ];
        case 'Arrow': return [
            new Bezier(rotateCoordinates(...Harpoon)),
            new Bezier(rotateCoordinates(...Harpoon.map((val, i) => i % 2 === 0 ? val : -val)))
        ];
        case 'tail': return [
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? -val : val))),
            new Bezier(rotateCoordinates(...harpoon.map(val => -val)))
        ];
        case 'two': return [
            new Bezier(rotateCoordinates(...harpoon)),
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? val : -val))),
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? val - 4.5 : val))),
            new Bezier(rotateCoordinates(...harpoon.map((val, i) => i % 2 === 0 ? val - 4.5 : -val)))
        ];
        case 'hook': return [
            new Bezier(rotateCoordinates(...hook))
        ];
        case 'hook-': return [
            new Bezier(rotateCoordinates(...hook.map((val, i) => i % 2 === 0 ? val : -val)))
        ];
        case 'bar': return [
            new Bezier(rotateCoordinates(...bar))
        ];
        case 'Bar': return [
            new Bezier(rotateCoordinates(...Bar))
        ];
        case 'none': return [];
    }
}
export function placeElement(element, coordinate) {
    element.style.left = coordinate.x + 'em';
    element.style.top = coordinate.y + 'em';
    element.style.height = '0';
    element.style.width = '0';
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
}
export function createCenteredElement(content, parent) {
    const element = document.createElement('div');
    const container = document.createElement('div');
    element.style.position = 'absolute';
    parent.append(element);
    element.append(container);
    container.append(content);
    return element;
}
export const cd = async (unit, compiler) => {
    const gap = parseGap(unit.options.gap);
    const element = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.style.position = 'relative';
    svg.style.position = 'absolute';
    svg.style.display = 'block';
    element.append(svg);
    let cell = {
        children: [],
        id: ''
    };
    let row = [cell];
    const table = [row];
    const arrows = [];
    const baseIdToCount = {};
    for (const line of unit.children) {
        if (line.length === 0) {
            cell.children.push(line);
            continue;
        }
        main: {
            const first = line[0];
            if (typeof first === 'string') {
                if (first === '&' && line.length === 1) {
                    row.push(cell = {
                        children: [],
                        id: ''
                    });
                    continue;
                }
                if (first === '\\' && line.length === 2 && line[1] === '\\') {
                    table.push(row = [cell = {
                            children: [],
                            id: ''
                        }]);
                    continue;
                }
                break main;
            }
            if (first.tag === 'ar' || first.tag === 'katex' && first.options.ar === true) {
                const base = {
                    row: table.length - 1,
                    column: row.length - 1
                };
                const body = parseArrowBody(first.options.body);
                const labels = extractLabels(first, baseIdToCount);
                arrows.push({
                    from: parsePosition(first.options.from, 'from', base),
                    to: parsePosition(first.options.to, 'to', base),
                    out: parseControl(first.options.out),
                    in: parseControl(first.options.in),
                    shift: parseArrowShift(first.options.shift),
                    body,
                    head: parseArrowMark(first.options.head, 'head', body),
                    tail: parseArrowMark(first.options.tail, 'tail', body),
                    labels,
                    class: typeof first.options.class === 'string' ? first.options.class : '',
                    style: typeof first.options.style === 'string' ? first.options.style : '',
                });
                continue;
            }
        }
        cell.children.push(line);
        if (cell.id.length === 0) {
            const baseId = stringToId(stdnToInlinePlainString([line]));
            if (baseId.length === 0) {
                continue;
            }
            const count = baseIdToCount[baseId] = (baseIdToCount[baseId] ?? 0) + 1;
            const id = count > 1 || baseId.length === 0 ? `${baseId}~${count}` : baseId;
            cell.id = id;
        }
    }
    const idSet = {};
    const cellEles = [];
    for (let i = 0; i < table.length; i++) {
        const row = table[i];
        for (let j = 0; j < row.length; j++) {
            const { children, id } = row[j];
            if (children.length === 0) {
                continue;
            }
            cellEles.push({
                element: createCenteredElement(await compiler.compileSTDN(children), element),
                position: {
                    row: i,
                    column: j
                },
                id
            });
            if (id.length > 0) {
                idSet[id] = true;
            }
        }
    }
    const idToLabelEle = {};
    const orderedArrows = [];
    let remainingArrows = arrows;
    while (true) {
        const newRemainingArrows = [];
        for (const arrow of remainingArrows) {
            const { from, to } = arrow;
            if (typeof from === 'string') {
                if (!idSet[from]) {
                    newRemainingArrows.push(arrow);
                    continue;
                }
            }
            if (typeof to === 'string') {
                if (!idSet[to]) {
                    newRemainingArrows.push(arrow);
                    continue;
                }
            }
            orderedArrows.push(arrow);
            for (const { unit, id } of arrow.labels) {
                const labelEle = createCenteredElement(await compiler.compileUnit(unit), element);
                labelEle.classList.add('label');
                idToLabelEle[id] = labelEle;
                idSet[id] = true;
            }
        }
        if (remainingArrows.length === newRemainingArrows.length) {
            break;
        }
        remainingArrows = newRemainingArrows;
    }
    function draw() {
        svg.innerHTML = '';
        const rowHeights = [];
        const columnWidths = [];
        const fontSize = Number(getComputedStyle(element).fontSize.slice(0, -2));
        let heightScale = 1 / fontSize;
        let widthScale = 1 / fontSize;
        const fo = element.closest('foreignObject');
        if (fo !== null) {
            const { height, width } = fo.getBoundingClientRect();
            heightScale *= fo.height.animVal.value / height;
            widthScale *= fo.width.animVal.value / width;
        }
        const positionToBox = {};
        const idToBox = {};
        for (const { element, position, id } of cellEles) {
            const { height, width } = element.children[0].getBoundingClientRect();
            const scaledHeight = height * heightScale + 2 * cellMargin;
            const scaledWidth = width * widthScale + 2 * cellMargin;
            const box = {
                height: scaledHeight,
                width: scaledWidth
            };
            positionToBox[position.row + ' ' + position.column] = box;
            if (id.length > 0) {
                idToBox[id] = box;
            }
            if ((rowHeights[position.row] ?? 0) < scaledHeight) {
                rowHeights[position.row] = scaledHeight;
            }
            if ((columnWidths[position.column] ?? 0) < scaledWidth) {
                columnWidths[position.column] = scaledWidth;
            }
        }
        function getCoordinate(position) {
            let x = (columnWidths[0] ?? 0) / 2;
            let y = (rowHeights[0] ?? 0) / 2;
            for (let i = 1; i <= position.column; i++) {
                const right = columnWidths[i - 1];
                const left = columnWidths[i];
                if (right !== undefined) {
                    x += right / 2;
                    if (left !== undefined) {
                        x += gap.column;
                    }
                }
                if (left !== undefined) {
                    x += left / 2;
                }
            }
            if (position.column % 1 !== 0) {
                const i = Math.floor(position.column);
                const right = columnWidths[i];
                const left = columnWidths[i + 1];
                if (right !== undefined) {
                    x += (position.column - i) * right / 2;
                    if (left !== undefined) {
                        x += (position.column - i) * gap.column;
                    }
                }
                if (left !== undefined) {
                    x += (position.column - i) * left / 2;
                }
            }
            for (let i = 1; i <= position.row; i++) {
                const bottom = rowHeights[i - 1];
                const top = rowHeights[i];
                if (bottom !== undefined) {
                    y += bottom / 2;
                    if (top !== undefined) {
                        y += gap.row;
                    }
                }
                if (top !== undefined) {
                    y += top / 2;
                }
            }
            if (position.row % 1 !== 0) {
                const i = Math.floor(position.row);
                const bottom = rowHeights[i];
                const top = rowHeights[i + 1];
                if (bottom !== undefined) {
                    y += (position.row - i) * bottom / 2;
                    if (top !== undefined) {
                        y += (position.row - i) * gap.row;
                    }
                }
                if (top !== undefined) {
                    y += (position.row - i) * top / 2;
                }
            }
            return { x, y };
        }
        const idToCoordinate = {};
        for (const { element, position, id } of cellEles) {
            const coordinate = getCoordinate(position);
            if (id.length > 0) {
                idToCoordinate[id] = coordinate;
            }
            placeElement(element, coordinate);
        }
        let xmin = 0;
        let ymin = 0;
        let xmax = getCoordinate({ row: 0, column: columnWidths.length }).x;
        let ymax = getCoordinate({ row: rowHeights.length, column: 0 }).y;
        function drawCurve(curve, shift, g) {
            const pieces = curve.offset(-shift);
            if (Array.isArray(pieces)) {
                drawPieces(pieces, g);
            }
        }
        function drawPieces(pieces, g) {
            const drawArray = [];
            for (const piece of pieces) {
                drawArray.push(piece.toSVG());
                const { x, y } = piece.bbox();
                const xmin0 = x.min - arrowWidth;
                const xmax0 = x.max + arrowWidth;
                const ymin0 = y.min - arrowWidth;
                const ymax0 = y.max + arrowWidth;
                if (xmin0 < xmin) {
                    xmin = xmin0;
                }
                if (xmax0 > xmax) {
                    xmax = xmax0;
                }
                if (ymin0 < ymin) {
                    ymin = ymin0;
                }
                if (ymax0 > ymax) {
                    ymax = ymax0;
                }
            }
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', drawArray.join(' '));
            path.style.strokeWidth = arrowWidth + 'px';
            path.style.fill = 'none';
            g.append(path);
        }
        for (const { from, to, out, in: arrowIn, head, tail, shift, body, class: classStr, style, labels } of orderedArrows) {
            let fromCoordinate;
            let toCoordinate;
            let fromBox;
            let toBox;
            if (typeof from !== 'string') {
                fromCoordinate = getCoordinate(from);
                const box = positionToBox[from.row + ' ' + from.column];
                if (box === undefined) {
                    fromBox = { height: 0, width: 0 };
                }
                else {
                    fromBox = box;
                }
            }
            else {
                const coordinate = idToCoordinate[from];
                const box = idToBox[from];
                if (coordinate === undefined || box === undefined) {
                    continue;
                }
                fromCoordinate = coordinate;
                fromBox = box;
            }
            if (typeof to !== 'string') {
                toCoordinate = getCoordinate(to);
                const box = positionToBox[to.row + ' ' + to.column];
                if (box === undefined) {
                    toBox = { height: 0, width: 0 };
                }
                else {
                    toBox = box;
                }
            }
            else {
                const coordinate = idToCoordinate[to];
                const box = idToBox[to];
                if (coordinate === undefined || box === undefined) {
                    continue;
                }
                toCoordinate = coordinate;
                toBox = box;
            }
            let start;
            let end;
            let startD;
            let endD;
            let startStrength;
            let endStrength;
            if (out === undefined || arrowIn === undefined) {
                const dx = toCoordinate.x - fromCoordinate.x;
                const dy = toCoordinate.y - fromCoordinate.y;
                const length = Math.sqrt(dx ** 2 + dy ** 2);
                if (length === 0) {
                    continue;
                }
                const d = { x: dx / length, y: dy / length };
                const angle = dToAngle(d);
                if (out === undefined) {
                    start = getEdgePoint(angle, fromCoordinate, fromBox);
                    startD = d;
                    startStrength = 1;
                }
                else {
                    start = getEdgePoint(out.angle, fromCoordinate, fromBox);
                    startD = angleToD(out.angle);
                    startStrength = out.strength;
                }
                if (arrowIn === undefined) {
                    end = getEdgePoint(angle + 180, toCoordinate, toBox);
                    endD = { x: -d.x, y: -d.y };
                    endStrength = 1;
                }
                else {
                    end = getEdgePoint(arrowIn.angle, toCoordinate, toBox);
                    endD = angleToD(arrowIn.angle);
                    endStrength = arrowIn.strength;
                }
            }
            else {
                start = getEdgePoint(out.angle, fromCoordinate, fromBox);
                end = getEdgePoint(arrowIn.angle, toCoordinate, toBox);
                startD = angleToD(out.angle);
                endD = angleToD(arrowIn.angle);
                startStrength = out.strength;
                endStrength = arrowIn.strength;
            }
            if (head === 'Arrow' || head === 'hook' || head === 'hook-' || head === 'tail') {
                start.x = start.x + startD.x * arrowBigMarkMargin;
                start.y = start.y + startD.y * arrowBigMarkMargin;
            }
            if (tail === 'Arrow' || tail === 'hook' || tail === 'hook-' || tail === 'tail') {
                end.x = end.x + endD.x * arrowBigMarkMargin;
                end.y = end.y + endD.y * arrowBigMarkMargin;
            }
            const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
            if (length === 0) {
                continue;
            }
            const startControl = {
                x: start.x + startD.x * length / 3 * startStrength,
                y: start.y + startD.y * length / 3 * startStrength
            };
            const endControl = {
                x: end.x + endD.x * length / 3 * endStrength,
                y: end.y + endD.y * length / 3 * endStrength
            };
            const curve = new Bezier(start.x, start.y, startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y);
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            try {
                g.setAttribute('class', classStr);
            }
            catch (err) {
                console.log(err);
            }
            try {
                g.setAttribute('style', style);
            }
            catch (err) {
                console.log(err);
            }
            svg.append(g);
            if (body === 'two') {
                drawCurve(curve, shift + twoArrowBodyShift, g);
                drawCurve(curve, shift - twoArrowBodyShift, g);
            }
            else {
                drawCurve(curve, shift, g);
            }
            {
                const base = {
                    x: end.x - endD.y * shift,
                    y: end.y + endD.x * shift
                };
                const pieces = createArrowMark(head, endD, base);
                if (pieces.length > 0) {
                    drawPieces(pieces, g);
                }
            }
            {
                const base = {
                    x: start.x + startD.y * shift,
                    y: start.y - startD.x * shift
                };
                const pieces = createArrowMark(tail, startD, base);
                if (pieces.length > 0) {
                    drawPieces(pieces, g);
                }
            }
            for (const { at, shift: labelShift, id } of labels) {
                const root = curve.get(at);
                const normal = curve.normal(at);
                let allShift = shift + labelShift;
                if (body === 'two' && labelShift !== 0) {
                    allShift += twoArrowBodyShift * Math.sign(labelShift);
                }
                const base = {
                    x: root.x - normal.x * allShift,
                    y: root.y - normal.y * allShift
                };
                idToCoordinate[id] = base;
                const labelEle = idToLabelEle[id];
                if (labelEle === undefined) {
                    throw new Error();
                }
                placeElement(labelEle, base);
                const { height, width } = labelEle.children[0].getBoundingClientRect();
                const scaledHeight = height * heightScale + 2 * labelMargin;
                const scaledWidth = width * widthScale + 2 * labelMargin;
                const box = {
                    height: scaledHeight,
                    width: scaledWidth
                };
                idToBox[id] = box;
            }
        }
        const width = xmax - xmin;
        const height = ymax - ymin;
        element.style.marginLeft = -xmin + 'em';
        element.style.marginTop = -ymin + 'em';
        element.style.width = xmax + 'em';
        element.style.height = ymax + 'em';
        svg.setAttribute('viewBox', `${xmin} ${ymin} ${width} ${height}`);
        svg.style.left = xmin + 'em';
        svg.style.top = ymin + 'em';
        svg.style.width = width + 'em';
        svg.style.height = height + 'em';
        return svg.innerHTML;
    }
    const observer = new MutationObserver(async () => {
        if (!element.isConnected) {
            return;
        }
        observer.disconnect();
        let html;
        let count = 0;
        const total = 1;
        while (true) {
            const nhtml = draw();
            if (nhtml === html) {
                count++;
                if (count === total) {
                    break;
                }
            }
            html = nhtml;
            console.log('test');
            await new Promise(r => setTimeout(r, 1000));
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return element;
};
