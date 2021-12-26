import type { UnitCompiler } from '@ddu6/stc';
import { Bezier } from 'bezier-js';
declare type ArrowMark = 'arrow' | 'arrow2' | 'arrow3' | 'bar' | 'bar2' | 'bar3' | 'harpoon' | '-harpoon' | 'hook' | '-hook' | 'loop' | '-loop' | 'tail' | 'two' | 'none';
export interface Coordinate {
    x: number;
    y: number;
}
export interface Box {
    height: number;
    width: number;
    top: number;
    bottom: number;
}
export interface AbsoluteElement {
    leftControler: HTMLDivElement;
    topControler: HTMLDivElement;
    container: HTMLDivElement;
}
export declare function angleToD(angle: number): Coordinate;
export declare function dToAngle(d: Coordinate): number;
export declare function getEdgePoint(angle: number, base: Coordinate, box: Box): Coordinate;
export declare function createArrowMark(mark: ArrowMark, d: Coordinate, base: Coordinate): Bezier[];
export declare function piecesToSquiggle(pieces: Bezier[]): Bezier[];
export declare function createAbsoluteElement(content: Node, after: Element): AbsoluteElement;
export declare function absoluteElementToBox(element: AbsoluteElement, heightScale: number, widthScale: number, margin: number): Box;
export declare function placeAbsoluteElement(element: AbsoluteElement, coordinate: Coordinate): void;
export declare const cd: UnitCompiler;
export declare const CD: UnitCompiler;
export {};
