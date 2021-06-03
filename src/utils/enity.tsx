type CellAlignment = "justify" | "center" | "left" | "right" | "distribute";

export interface Cell {
  rows: number;
  columns: number;
  content: string;
  alignment: CellAlignment;
  cellPadding: number[];
  font: string;
}

type Alignment = "top" | "center" | "bottom";

export interface Table {
  rows: number;
  columns: number;
  lineUnitBefore: number;
  lineUnitAfter: number;
  alignment: Alignment;
  cellPadding: number[];
  cellSpacing: number;
  cellAlignment: CellAlignment;
  font: string;
  cells: Cell[];
}

type ParagraphAlignment = CellAlignment | "thai" | "hi" | "low" | "med";

export interface Paragraph {
  alignment?: ParagraphAlignment;
  textIntent?: number;
  lineSpacing?: number;
  lineUnitBefore?: number;
  lineUnitAfter?: number
}

export interface Font {
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
  size?: number;
  spacing?: number;
  textColor?: string
}

export interface StyleItem {
  id: string;
  fontStyles?: Font;
  paragraphStyles?: Paragraph;
}

export type FontKey = keyof Font;

export type ParagraphKey = keyof Paragraph;