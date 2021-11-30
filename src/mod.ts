import {UnitCompiler,stdnToInlinePlainString,stringToId} from '@ddu6/stc'
import {STDN,STDNUnit,STDNUnitOptions} from 'stdn'
import {Bezier} from 'bezier-js'
const arrowWidth=.04
const arrowBigMarkMargin=4*arrowWidth
const twoArrowBodyShift=2.5*arrowWidth
const defaultLabelShift=.8
const defaultArrowShift=6*arrowWidth
const defaultBendAngle=30
const defaultRowGap=1.8
const defaultColumnGap=2.4
const cellMargin=.5
const labelMargin=.3
const squigglePeriod=.5
export type ArrowMark='arrow'|'Arrow'|'bar'|'Bar'|'harpoon'|'harpoon-'|'hook'|'hook-'|'tail'|'two'|'none'
export type ArrowBody='one'|'two'|'squiggle'
export interface Cell{
    children:STDN
    id:string
}
export interface CellElement{
    element:AbsoluteElement
    position:Position
    id:string
}
export interface Position{
    row:number
    column:number
}
export interface Box{
    height:number
    width:number
    top:number
    bottom:number
}
export interface Control{
    angle:number
    strength:number
}
export interface Label{
    at:number
    shift:number
    unit:STDNUnit
    id:string
}
export interface Arrow{
    from:Position|string
    to:Position|string
    out:Control|undefined
    in:Control|undefined
    bend:Control|undefined
    shift:number
    body:ArrowBody
    head:ArrowMark
    tail:ArrowMark
    labels:Label[]
    class:string
    style:string
}
export interface BaseIdToCount{
    [key:string]:number|undefined
}
export interface Coordinate{
    x:number
    y:number
}
export interface AbsoluteElement{
    leftControler:HTMLDivElement
    topControler:HTMLDivElement
    container:HTMLDivElement
}
export function parseGap(option:STDNUnitOptions[string]):Position{
    if(typeof option==='number'&&isFinite(option)){
        return {
            row:option,
            column:option
        }
    }
    if(typeof option==='string'){
        let [column,row]=option.split(/\s+/,2).map(Number)
        if(!isFinite(column)){
            column=defaultColumnGap
        }
        if(!isFinite(row)){
            row=defaultRowGap
        }
        return {
            row,
            column
        }
    }
    return {
        row:defaultRowGap,
        column:defaultColumnGap
    }
}
export function parsePosition(option:STDNUnitOptions[string],at:'from'|'to',base:Position):Position|string{
    if(typeof option==='number'&&isFinite(option)){
        return {
            row:base.row,
            column:base.column+option
        }
    }
    if(typeof option!=='string'){
        if(at==='from'){
            return {
                row:base.row,
                column:base.column
            }
        }
        return {
            row:base.row,
            column:base.column+1
        }
    }
    const [dcolumn,drow]=option.split(/\s+/,2).map(val=>Number(val??0))
    if(isFinite(dcolumn)&&isFinite(drow)){
        return {
            row:base.row+drow,
            column:base.column+dcolumn
        }
    }
    return option
}
export function parseControl(option:STDNUnitOptions[string]):Control|undefined{
    if(typeof option==='number'&&isFinite(option)){
        return {
            angle:option,
            strength:1
        }
    }
    if(option===true){
        return {
            angle:defaultBendAngle,
            strength:1
        }
    }
    if(typeof option!=='string'){
        return undefined
    }
    let [angle,strength]=option.split(/\s+/,2).map(Number)
    if(!isFinite(angle)){
        angle=0
    }
    if(!isFinite(strength)){
        strength=1
    }
    return {
        angle,
        strength
    }
}
export function parseArrowShift(option:STDNUnitOptions[string]){
    if(typeof option==='number'&&isFinite(option)){
        return option
    }
    if(option===true){
        return defaultArrowShift
    }
    return 0
}
export function parseArrowBody(option:STDNUnitOptions[string]):ArrowBody{
    if(option==='two'||option==='squiggle'){
        return option
    }
    return 'one'
}
export function parseArrowMark(option:STDNUnitOptions[string],at:'head'|'tail',body:ArrowBody):ArrowMark{
    if(option==='none'){
        return option
    }
    if(option==='arrow'){
        return body==='two'?'Arrow':option
    }
    if(option==='bar'){
        return body==='two'?'Bar':option
    }
    if(option==='harpoon'||option==='harpoon-'||option==='hook'||option==='hook-'||option==='two'||option==='tail'){
        return body==='two'?'none':option
    }
    return at==='tail'?'none':body==='two'?'Arrow':'arrow'
}
export function extractLabels(children:STDN,tag:string,baseIdToCount:BaseIdToCount){
    const labels:Label[]=[]
    const main:STDNUnit={
        tag:tag==='katex'?tag:'div',
        options:{},
        children:[]
    }
    for(const line of children){
        if(line.length===0){
            main.children.push(line)
            continue
        }
        const first=line[0]
        if(typeof first==='string'){
            main.children.push(line)
            continue
        }
        let {at,shift}=first.options
        if(at!==undefined||shift!==undefined){
            if(typeof at!=='number'||at<0||at>1){
                at=.5
            }
            if(typeof shift!=='number'||!isFinite(shift)){
                shift=defaultLabelShift
            }
            let baseId=first.options['cd-id']
            if(typeof baseId!=='string'){
                baseId=stdnToInlinePlainString(first.children)
            }
            baseId=stringToId(baseId)
            const count=baseIdToCount[baseId]=(baseIdToCount[baseId]??0)+1
            const id=count>1||baseId.length===0?`${baseId}~${count}`:baseId
            labels.push({
                at,
                shift,
                unit:first,
                id
            })
            continue
        }
        main.children.push(line)
    }
    if(main.children.length>0){
        const baseId=stringToId(stdnToInlinePlainString(main.children))
        const count=baseIdToCount[baseId]=(baseIdToCount[baseId]??0)+1
        const id=count>1||baseId.length===0?`${baseId}~${count}`:baseId
        labels.push({
            at:.5,
            shift:defaultLabelShift,
            unit:main,
            id
        })
    }
    return labels
}
export function angleToD(angle:number):Coordinate{
    return {
        x:Math.cos(angle/180*Math.PI),
        y:-Math.sin(angle/180*Math.PI)
    }
}
export function dToAngle(d:Coordinate){
    const angle=Math.acos(d.x)/Math.PI*180
    if(d.y<=0){
        return angle
    }
    return 360-angle
}
export function getEdgePoint(angle:number,base:Coordinate,box:Box):Coordinate{
    angle=angle%360
    if(angle<0){
        angle+=360
    }
    if(angle===0){
        return {
            x:base.x+box.width/2,
            y:base.y
        }
    }
    if(angle===180){
        return {
            x:base.x-box.width/2,
            y:base.y
        }
    }
    if(angle===90){
        return {
            x:base.x,
            y:base.y-box.top
        }
    }
    if(angle===270){
        return {
            x:base.x,
            y:base.y+box.bottom
        }
    }
    const k=Math.abs(Math.tan(angle/180*Math.PI))
    if(angle<90){
        const x=Math.min(box.width/2,box.top/k)
        const y=Math.min(box.top,box.width*k/2)
        return {x:base.x+x,y:base.y-y}
    }
    if(angle<180){
        const x=Math.min(box.width/2,box.top/k)
        const y=Math.min(box.top,box.width*k/2)
        return {x:base.x-x,y:base.y-y}
    }
    if(angle<270){
        const x=Math.min(box.width/2,box.bottom/k)
        const y=Math.min(box.bottom,box.width*k/2)
        return {x:base.x-x,y:base.y+y}
    }
    const x=Math.min(box.width/2,box.bottom/k)
    const y=Math.min(box.bottom,box.width*k/2)
    return {x:base.x+x,y:base.y+y}
}
const harpoon=[5.4,6.5,4.8,3,2,1,0,0]
const Harpoon=[4.5,7.5,3,4.5,-1.5,1,-4.5,0]
const hook=[0,0,-6,0,-6,-5,0,-5]
const bar=[0,5,0,0,0,-5]
const Bar=[0,7.5,0,0,0,-7.5]
export function createArrowMark(mark:ArrowMark,d:Coordinate,base:Coordinate):Bezier[]{
    function rotateAndScaleOne(coordinate:Coordinate):Coordinate{
        return {
            x:base.x+coordinate.x*arrowWidth*d.x-coordinate.y*arrowWidth*d.y,
            y:base.y+coordinate.y*arrowWidth*d.x+coordinate.x*arrowWidth*d.y
        }
    }
    function trans(...coordinates:number[]){
        const out:number[]=[]
        const num=Math.floor(coordinates.length/2)
        for(let i=0;i<num;i++){
            const j=2*i
            const {x,y}=rotateAndScaleOne({x:coordinates[j],y:coordinates[j+1]})
            out.push(x,y)
        }
        return out
    }
    switch(mark){
        case 'harpoon':return [
            new Bezier(trans(...harpoon))
        ]
        case 'harpoon-':return [
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?val:-val)))
        ]
        case 'arrow':return [
            new Bezier(trans(...harpoon)),
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?val:-val)))
        ]
        case 'Arrow':return [
            new Bezier(trans(...Harpoon)),
            new Bezier(trans(...Harpoon.map((val,i)=>i%2===0?val:-val)))
        ]
        case 'tail':return [
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?-val:val))),
            new Bezier(trans(...harpoon.map(val=>-val)))
        ]
        case 'two':return [
            new Bezier(trans(...harpoon)),
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?val:-val))),
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?val+4.5:val))),
            new Bezier(trans(...harpoon.map((val,i)=>i%2===0?val+4.5:-val)))
        ]
        case 'hook':return [
            new Bezier(trans(...hook))
        ]
        case 'hook-':return [
            new Bezier(trans(...hook.map((val,i)=>i%2===0?val:-val)))
        ]
        case 'bar':return [
            new Bezier(trans(...bar))
        ]
        case 'Bar':return [
            new Bezier(trans(...Bar))
        ]
        case 'none':return []
    }
}
export function createAbsoluteElement(content:Node,parent:HTMLDivElement):AbsoluteElement{
    const leftControler=document.createElement('div')
    const centerDiv=document.createElement('div')
    const topControler=document.createElement('div')
    const container=document.createElement('div')
    leftControler.style.position='absolute'
    leftControler.style.top='0'
    leftControler.style.width='0'
    leftControler.style.display='flex'
    leftControler.style.justifyContent='center'
    topControler.style.display='inline-block'
    container.style.display='inline-block'
    container.style.verticalAlign='-0.5ex'
    container.style.width='max-content'
    parent.append(leftControler)
    leftControler.append(centerDiv)
    centerDiv.append(topControler)
    centerDiv.append(container)
    container.append(content)
    return {
        leftControler,
        topControler,
        container
    }
}
export function placeAbsoluteElement(element:AbsoluteElement,coordinate:Coordinate){
    element.leftControler.style.left=coordinate.x+'em'
    element.topControler.style.height=coordinate.y+'em'
}
export function absoluteElementToBox(element:AbsoluteElement,heightScale:number,widthScale:number,margin:number):Box{
    const {height,width}=element.container.getBoundingClientRect()
    const scaledHeight=height*heightScale
    const scaledWidth=width*widthScale
    element.topControler.style.height=scaledHeight+'em'
    const {top:baseTop}=element.topControler.getBoundingClientRect()
    const {top}=element.container.getBoundingClientRect()
    const scaledBottom=Math.min(scaledHeight,(top-baseTop)*heightScale)
    return {
        height:scaledHeight+2*margin,
        width:scaledWidth+2*margin,
        top:scaledHeight-scaledBottom+margin,
        bottom:scaledBottom+margin
    }
}
export function piecesToSquiggle(pieces:Bezier[]):Bezier[]{
    let totalLength=0
    const parts:{
        length:number
        bezier:Bezier
    }[]=[]
    for(const bezier of pieces){
        const length=bezier.length()
        if(length>0){
            totalLength+=length
            parts.push({
                length,
                bezier
            })
        }
    }
    if(totalLength<2*squigglePeriod||parts.length===0){
        return pieces
    }
    const coordinateGap=squigglePeriod/2
    const coordinateNum=Math.floor(totalLength/coordinateGap)-1
    const minCoordinateLength=coordinateGap
    const maxCoordinateLength=coordinateNum*coordinateGap
    const out:Bezier[]=[]
    let targetCoordinateIndex=0
    let coordinate:Coordinate|undefined
    let currentLength=0
    for(const {length,bezier} of parts){
        const nextLength=currentLength+length
        if(currentLength<minCoordinateLength){
            if(nextLength<=minCoordinateLength){
                out.push(bezier)
            }else{
                out.push(bezier.split(0,(minCoordinateLength-currentLength)/length))
            }
        }
        if(targetCoordinateIndex<coordinateNum){
            while(true){
                const targetLength=(targetCoordinateIndex+1)*coordinateGap
                if(targetLength>nextLength){
                    break
                }
                const newCoordinate=bezier.get((targetLength-currentLength)/length)
                if(coordinate!==undefined){
                    const dx=newCoordinate.x-coordinate.x
                    const dy=newCoordinate.y-coordinate.y
                    const subLength=Math.sqrt(dx**2+dy**2)
                    if(subLength>0){
                        const d:Coordinate={
                            x:dx/subLength,
                            y:dy/subLength
                        }
                        const mid:Coordinate={
                            x:(coordinate.x+newCoordinate.x)/2,
                            y:(coordinate.y+newCoordinate.y)/2
                        }
                        if(targetCoordinateIndex%2===1){
                            mid.x+=d.y*twoArrowBodyShift
                            mid.y-=d.x*twoArrowBodyShift
                        }else{
                            mid.x-=d.y*twoArrowBodyShift
                            mid.y+=d.x*twoArrowBodyShift
                        }
                        out.push(new Bezier(coordinate.x,coordinate.y,(coordinate.x+mid.x)/2,(coordinate.y+mid.y)/2,mid.x,mid.y))
                        out.push(new Bezier(mid.x,mid.y,(mid.x+newCoordinate.x)/2,(mid.y+newCoordinate.y)/2,newCoordinate.x,newCoordinate.y))
                    }
                }
                coordinate=newCoordinate
                targetCoordinateIndex++
                if(targetCoordinateIndex===coordinateNum){
                    break
                }
            }
        }
        if(nextLength>maxCoordinateLength){
            if(currentLength>=maxCoordinateLength){
                out.push(bezier)
            }else{
                out.push(bezier.split((maxCoordinateLength-currentLength)/length,1))
            }
        }
        currentLength=nextLength
    }
    return out
}
export const cd:UnitCompiler=async (unit,compiler)=>{
    const gap=parseGap(unit.options.gap)
    const element=document.createElement('div')
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg')
    element.classList.add('cd')
    element.style.position='relative'
    svg.style.position='absolute'
    svg.style.left='0'
    svg.style.top='0'
    element.append(svg)
    let cell:Cell={
        children:[],
        id:''
    }
    let row=[cell]
    const table=[row]
    const arrows:Arrow[]=[]
    const baseIdToCount:BaseIdToCount={}
    for(const line of unit.children){
        if(line.length===0){
            cell.children.push(line)
            continue
        }
        main:{
            const first=line[0]
            if(typeof first==='string'){
                if(first==='&'&&line.length===1){
                    row.push(cell={
                        children:[],
                        id:''
                    })
                    continue
                }
                if(first==='\\'&&line.length===2&&line[1]==='\\'){
                    table.push(row=[cell={
                        children:[],
                        id:''
                    }])
                    continue
                }
                break main
            }
            if(first.tag==='ar'||first.tag==='katex'&&first.options.ar===true){
                const base:Position={
                    row:table.length-1,
                    column:row.length-1
                }
                const body=parseArrowBody(first.options.body)
                const labels=extractLabels(first.children,first.tag,baseIdToCount)
                arrows.push({
                    from:parsePosition(first.options.from,'from',base),
                    to:parsePosition(first.options.to,'to',base),
                    out:parseControl(first.options.out),
                    in:parseControl(first.options.in),
                    bend:parseControl(first.options.bend),
                    shift:parseArrowShift(first.options.shift),
                    body,
                    head:parseArrowMark(first.options.head,'head',body),
                    tail:parseArrowMark(first.options.tail,'tail',body),
                    labels,
                    class:typeof first.options.class==='string'?first.options.class:'',
                    style:typeof first.options.style==='string'?first.options.style:'',
                })
                continue
            }
        }
        cell.children.push(line)
        if(cell.id.length===0){
            const baseId=stringToId(stdnToInlinePlainString([line]))
            if(baseId.length===0){
                continue
            }
            const count=baseIdToCount[baseId]=(baseIdToCount[baseId]??0)+1
            const id=count>1||baseId.length===0?`${baseId}~${count}`:baseId
            cell.id=id
        }
    }
    const idSet:{
        [key:string]:true|undefined
    }={}
    const cellElements:CellElement[]=[]
    for(let i=0;i<table.length;i++){
        const row=table[i]
        for(let j=0;j<row.length;j++){
            const {children,id}=row[j]
            if(children.length===0){
                continue
            }
            cellElements.push({
                element:createAbsoluteElement(unit.tag==='CD'?await compiler.compileUnit({
                    tag:'katex',
                    options:{},
                    children
                }):await compiler.compileSTDN(children),element),
                position:{
                    row:i,
                    column:j
                },
                id
            })
            if(id.length>0){
                idSet[id]=true
            }
        }
    }
    const idToLabelElement:{
        [key:string]:AbsoluteElement|undefined
    }={}
    const orderedArrows:Arrow[]=[]
    let remainingArrows=arrows
    while(true){
        const newRemainingArrows:Arrow[]=[]
        for(const arrow of remainingArrows){
            const {from,to}=arrow
            if(typeof from==='string'){
                if(!idSet[from]){
                    newRemainingArrows.push(arrow)
                    continue
                }
            }
            if(typeof to==='string'){
                if(!idSet[to]){
                    newRemainingArrows.push(arrow)
                    continue
                }
            }
            orderedArrows.push(arrow)
            for(const {unit,id} of arrow.labels){
                const labelElement=createAbsoluteElement(await compiler.compileUnit(unit),element)
                if(unit.options['normal-font-size']!==true){
                    labelElement.container.style.fontSize='var(--length-font-log)'
                }
                idToLabelElement[id]=labelElement
                idSet[id]=true
            }
        }
        if(remainingArrows.length===newRemainingArrows.length){
            break
        }
        remainingArrows=newRemainingArrows
    }
    function draw(){
        svg.innerHTML=''
        const rowHeights:(number|undefined)[]=[]
        const columnWidths:(number|undefined)[]=[]
        const fontSize=Number(getComputedStyle(element).fontSize.slice(0,-2))
        let heightScale=1/fontSize
        let widthScale=1/fontSize
        const fo=element.closest('foreignObject')
        if(fo!==null){
            const {height,width}=fo.getBoundingClientRect()
            heightScale*=fo.height.animVal.value/height
            widthScale*=fo.width.animVal.value/width
        }
        const positionToBox:{
            [key:string]:Box|undefined
        }={}
        const idToBox:{
            [key:string]:Box|undefined
        }={}
        for(const {element,position,id} of cellElements){
            const box=absoluteElementToBox(element,heightScale,widthScale,cellMargin)
            positionToBox[position.row+' '+position.column]=box
            if(id.length>0){
                idToBox[id]=box
            }
            if((rowHeights[position.row]??0)<box.height){
                rowHeights[position.row]=box.height
            }
            if((columnWidths[position.column]??0)<box.width){
                columnWidths[position.column]=box.width
            }
        }
        function getCoordinate(position:Position):Coordinate{
            let x=position.column>=0?(columnWidths[0]??0)/2:0
            let y=position.row>=0?(rowHeights[0]??0)/2:0
            for(let i=1;i<=position.column;i++){
                const right=columnWidths[i-1]
                const left=columnWidths[i]
                if(right!==undefined){
                    x+=right/2
                    if(left!==undefined){
                        x+=gap.column
                    }
                }
                if(left!==undefined){
                    x+=left/2
                }
            }
            if(position.column%1!==0){
                const i=Math.floor(position.column)
                const right=columnWidths[i]
                const left=columnWidths[i+1]
                if(right!==undefined){
                    x+=(position.column-i)*right/2
                    if(left!==undefined){
                        x+=(position.column-i)*gap.column
                    }
                }
                if(left!==undefined){
                    x+=(position.column-i)*left/2
                }
            }
            for(let i=1;i<=position.row;i++){
                const bottom=rowHeights[i-1]
                const top=rowHeights[i]
                if(bottom!==undefined){
                    y+=bottom/2
                    if(top!==undefined){
                        y+=gap.row
                    }
                }
                if(top!==undefined){
                    y+=top/2
                }
            }
            if(position.row%1!==0){
                const i=Math.floor(position.row)
                const bottom=rowHeights[i]
                const top=rowHeights[i+1]
                if(bottom!==undefined){
                    y+=(position.row-i)*bottom/2
                    if(top!==undefined){
                        y+=(position.row-i)*gap.row
                    }
                }
                if(top!==undefined){
                    y+=(position.row-i)*top/2
                }
            }
            return {x,y}
        }
        const idToCoordinate:{
            [key:string]:Coordinate|undefined
        }={}
        for(const {position,id} of cellElements){
            const coordinate=getCoordinate(position)
            if(id.length>0){
                idToCoordinate[id]=coordinate
            }
        }
        let xmin=0
        let ymin=0
        let xmax=getCoordinate({row:0,column:columnWidths.length}).x
        let ymax=getCoordinate({row:rowHeights.length,column:0}).y
        function drawPieces(pieces:Bezier[],g:SVGGElement){
            const drawArray:string[]=[]
            for(const piece of pieces){
                drawArray.push(piece.toSVG())
                const {x,y}=piece.bbox()
                const xmin0=x.min-arrowWidth
                const xmax0=x.max+arrowWidth
                const ymin0=y.min-arrowWidth
                const ymax0=y.max+arrowWidth
                if(xmin0<xmin){
                    xmin=xmin0
                }
                if(xmax0>xmax){
                    xmax=xmax0
                }
                if(ymin0<ymin){
                    ymin=ymin0
                }
                if(ymax0>ymax){
                    ymax=ymax0
                }
            }
            const path=document.createElementNS('http://www.w3.org/2000/svg','path')
            path.setAttribute('d',drawArray.join(' '))
            path.style.strokeWidth=arrowWidth+'px'
            path.style.fill='none'
            g.append(path)
        }
        function drawBezier(bezier:Bezier,shift:number,g:SVGGElement){
            const pieces=bezier.offset(-shift)
            if(Array.isArray(pieces)){
                drawPieces(pieces,g)
            }
        }
        function drawBezierToSquiggle(bezier:Bezier,shift:number,g:SVGGElement){
            const pieces=bezier.offset(-shift)
            if(Array.isArray(pieces)){
                drawPieces(piecesToSquiggle(pieces),g)
            }
        }
        for(const {from,to,out,in:arrowIn,bend,head,tail,shift,body,class:classStr,style,labels} of orderedArrows){
            let fromCoordinate:Coordinate
            let toCoordinate:Coordinate
            let fromBox:Box
            let toBox:Box
            if(typeof from!=='string'){
                fromCoordinate=getCoordinate(from)
                const box=positionToBox[from.row+' '+from.column]
                if(box===undefined){
                    fromBox={height:0,width:0,top:0,bottom:0}
                }else{
                    fromBox=box
                }
            }else{
                const coordinate=idToCoordinate[from]
                const box=idToBox[from]
                if(coordinate===undefined||box===undefined){
                    continue
                }
                fromCoordinate=coordinate
                fromBox=box
            }
            if(typeof to!=='string'){
                toCoordinate=getCoordinate(to)
                const box=positionToBox[to.row+' '+to.column]
                if(box===undefined){
                    toBox={height:0,width:0,top:0,bottom:0}
                }else{
                    toBox=box
                }
            }else{
                const coordinate=idToCoordinate[to]
                const box=idToBox[to]
                if(coordinate===undefined||box===undefined){
                    continue
                }
                toCoordinate=coordinate
                toBox=box
            }
            let start:Coordinate
            let end:Coordinate
            let startD:Coordinate
            let endD:Coordinate
            let startStrength:number
            let endStrength:number
            if(out===undefined||arrowIn===undefined){
                const dx=toCoordinate.x-fromCoordinate.x
                const dy=toCoordinate.y-fromCoordinate.y
                const length=Math.sqrt(dx**2+dy**2)
                if(length===0){
                    continue
                }
                const angle=dToAngle({x:dx/length,y:dy/length})
                let bendAngle=0
                let bendStrength=1
                if(bend!==undefined){
                    bendAngle=bend.angle
                    bendStrength=bend.strength
                }
                if(out===undefined){
                    const startAngle=angle+bendAngle
                    start=getEdgePoint(startAngle,fromCoordinate,fromBox)
                    startD=angleToD(startAngle)
                    startStrength=bendStrength
                }else{
                    start=getEdgePoint(out.angle,fromCoordinate,fromBox)
                    startD=angleToD(out.angle)
                    startStrength=out.strength
                }
                if(arrowIn===undefined){
                    const endAngle=angle+180-bendAngle
                    end=getEdgePoint(endAngle,toCoordinate,toBox)
                    endD=angleToD(endAngle)
                    endStrength=bendStrength
                }else{
                    end=getEdgePoint(arrowIn.angle,toCoordinate,toBox)
                    endD=angleToD(arrowIn.angle)
                    endStrength=arrowIn.strength
                }
            }else{
                start=getEdgePoint(out.angle,fromCoordinate,fromBox)
                end=getEdgePoint(arrowIn.angle,toCoordinate,toBox)
                startD=angleToD(out.angle)
                endD=angleToD(arrowIn.angle)
                startStrength=out.strength
                endStrength=arrowIn.strength
            }
            if(head==='Arrow'||head==='hook'||head==='hook-'||head==='tail'){
                end.x=end.x+endD.x*arrowBigMarkMargin
                end.y=end.y+endD.y*arrowBigMarkMargin
            }
            if(tail==='Arrow'||tail==='hook'||tail==='hook-'||tail==='tail'){
                start.x=start.x+startD.x*arrowBigMarkMargin
                start.y=start.y+startD.y*arrowBigMarkMargin
            }
            const length=Math.sqrt((end.x-start.x)**2+(end.y-start.y)**2)
            if(length===0){
                continue
            }
            const startControl:Coordinate={
                x:start.x+startD.x*length/3*startStrength,
                y:start.y+startD.y*length/3*startStrength
            }
            const endControl:Coordinate={
                x:end.x+endD.x*length/3*endStrength,
                y:end.y+endD.y*length/3*endStrength
            }
            const bezier=new Bezier(start.x,start.y,startControl.x,startControl.y,endControl.x,endControl.y,end.x,end.y)
            const g=document.createElementNS('http://www.w3.org/2000/svg','g')
            try{
                g.setAttribute('class',classStr)
            }catch(err){
                console.log(err)
            }
            try{
                g.setAttribute('style',style)
            }catch(err){
                console.log(err)
            }
            svg.append(g)
            if(body==='two'){
                drawBezier(bezier,shift+twoArrowBodyShift,g)
                drawBezier(bezier,shift-twoArrowBodyShift,g)
            }else if(body==='squiggle'){
                drawBezierToSquiggle(bezier,shift,g)
            }else{
                drawBezier(bezier,shift,g)
            }
            {
                const base:Coordinate={
                    x:end.x-endD.y*shift,
                    y:end.y+endD.x*shift
                }
                const pieces=createArrowMark(head,endD,base)
                if(pieces.length>0){
                    drawPieces(pieces,g)
                }
            }
            {
                const base:Coordinate={
                    x:start.x+startD.y*shift,
                    y:start.y-startD.x*shift
                }
                const pieces=createArrowMark(tail,startD,base)
                if(pieces.length>0){
                    drawPieces(pieces,g)
                }
            }
            for(const {at,shift:labelShift,id} of labels){
                const root=bezier.get(at)
                const normal=bezier.normal(at)
                let allShift=shift+labelShift
                if((body==='two'||body==='squiggle')&&labelShift!==0){
                    allShift+=twoArrowBodyShift*Math.sign(labelShift)
                }
                const base:Coordinate={
                    x:root.x-normal.x*allShift,
                    y:root.y-normal.y*allShift
                }
                idToCoordinate[id]=base
                const labelElement=idToLabelElement[id]
                if(labelElement===undefined){
                    throw new Error()
                }
                const box=absoluteElementToBox(labelElement,heightScale,widthScale,labelMargin)
                idToBox[id]=box
                const xmin0=base.x-box.width/2
                const xmax0=base.x+box.width/2
                const ymin0=base.y-box.top
                const ymax0=base.y+box.bottom
                if(xmin0<xmin){
                    xmin=xmin0
                }
                if(xmax0>xmax){
                    xmax=xmax0
                }
                if(ymin0<ymin){
                    ymin=ymin0
                }
                if(ymax0>ymax){
                    ymax=ymax0
                }
            }
        }
        const width=xmax-xmin
        const height=ymax-ymin
        element.style.width=svg.style.width=width+'em'
        element.style.height=svg.style.height=height+'em'
        svg.setAttribute('viewBox',`${xmin} ${ymin} ${width} ${height}`)
        for(const {element,position} of cellElements){
            const coordinate=getCoordinate(position)
            placeAbsoluteElement(element,{
                x:coordinate.x-xmin,
                y:coordinate.y-ymin
            })
        }
        for(const id of Object.keys(idToLabelElement)){
            const labelElement=idToLabelElement[id]
            const base=idToCoordinate[id]
            if(labelElement===undefined||base===undefined){
                continue
            }
            placeAbsoluteElement(labelElement,{
                x:base.x-xmin,
                y:base.y-ymin
            })
        }
        return svg.innerHTML
    }
    const observer=new MutationObserver(async ()=>{
        if(!element.isConnected){
            return
        }
        observer.disconnect()
        let html:string|undefined
        let count=0
        const total=1
        while(true){
            const nhtml=draw()
            if(nhtml===html){
                count++
                if(count===total){
                    break
                }
            }
            html=nhtml
            await new Promise(r=>setTimeout(r,1000))
        }
    })
    observer.observe(document.body,{childList:true,subtree:true})
    return element
}
export const CD=cd