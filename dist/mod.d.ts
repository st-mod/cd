import { UnitCompiler } from '@ddu6/stc';
import { STDN, STDNUnit, STDNUnitOptions } from 'stdn';
import { Bezier } from 'bezier-js';
export declare type ArrowMark = 'arrow' | 'Arrow' | 'bar' | 'Bar' | 'harpoon' | 'harpoon-' | 'hook' | 'hook-' | 'tail' | 'two' | 'none';
export declare type ArrowBody = 'two' | 'one';
export interface Cell {
    children: STDN;
    id: string;
}
export interface CellEle {
    element: HTMLDivElement;
    position: Position;
    id: string;
}
export interface Position {
    row: number;
    column: number;
}
export interface Box {
    height: number;
    width: number;
}
export interface Control {
    angle: number;
    strength: number;
}
export interface Label {
    at: number;
    shift: number;
    unit: STDNUnit;
    id: string;
}
export interface Arrow {
    from: Position | string;
    to: Position | string;
    out: Control | undefined;
    in: Control | undefined;
    shift: number;
    body: ArrowBody;
    head: ArrowMark;
    tail: ArrowMark;
    labels: Label[];
    class: string;
    style: string;
}
export interface BaseIdToCount {
    [key: string]: number | undefined;
}
export interface Coordinate {
    x: number;
    y: number;
}
export declare function parseGap(option: STDNUnitOptions[string]): Position;
export declare function parsePosition(option: STDNUnitOptions[string], at: 'from' | 'to', base: Position): Position | string;
export declare function parseControl(option: STDNUnitOptions[string]): Control | undefined;
export declare function parseArrowShift(option: STDNUnitOptions[string]): number;
export declare function parseArrowBody(option: STDNUnitOptions[string]): ArrowBody;
export declare function parseArrowMark(option: STDNUnitOptions[string], at: 'head' | 'tail', body: ArrowBody): ArrowMark;
export declare function extractLabels(unit: STDNUnit, baseIdToCount: BaseIdToCount): Label[];
export declare function angleToD(angle: number): Coordinate;
export declare function dToAngle(d: Coordinate): number;
export declare function getEdgePoint(angle: number, base: Coordinate, box: Box): Coordinate;
export declare function createArrowMark(mark: ArrowMark, d: Coordinate, base: Coordinate): Bezier[];
export declare function placeElement(element: HTMLElement | SVGElement, coordinate: Coordinate): void;
export declare function createCenteredElement(content: Node, parent: HTMLDivElement): HTMLDivElement;
export declare const cd: UnitCompiler;
