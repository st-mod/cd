import type { UnitCompiler } from '@ddu6/stc';
import { Bezier } from 'bezier-js';
interface Coordinate {
    x: number;
    y: number;
}
interface Box {
    height: number;
    width: number;
    top: number;
    bottom: number;
}
export declare function angleToD(angle: number): Coordinate;
export declare function dToAngle(d: Coordinate): number;
export declare function getEdgePoint(angle: number, base: Coordinate, box: Box): Coordinate;
export declare function createAbsoluteElement(content: Node): {
    element: HTMLDivElement;
    baselineBlock: HTMLDivElement;
    container: HTMLDivElement;
};
type AbsoluteElement = ReturnType<typeof createAbsoluteElement>;
export declare function absoluteElementToBox(element: AbsoluteElement, heightScale: number, widthScale: number, margin: number): Box;
export declare function placeAbsoluteElement(element: AbsoluteElement, coordinate: Coordinate): void;
type ArrowMark = 'arrow' | 'arrow2' | 'arrow3' | 'bar' | 'bar2' | 'bar3' | 'harpoon' | '-harpoon' | 'hook' | '-hook' | 'loop' | '-loop' | 'tail' | 'two' | 'none';
export declare function createArrowMark(mark: ArrowMark, d: Coordinate, base: Coordinate): Bezier[];
export declare function piecesToSquiggle(pieces: Bezier[]): Bezier[];
export declare const cd: UnitCompiler;
export declare const CD: UnitCompiler;
export {};
