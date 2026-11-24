import type { SerializedElementNode, SerializedLexicalNode } from "lexical";

// Mirrors @lexical/table's SerializedTableCellNode, which this app doesn't depend on directly.
export type SerializedTableCellNode = SerializedElementNode & {
  /** Bit flags: HEADER_ROW and HEADER_COLUMN. */
  headerState: number;
  colSpan?: number;
  rowSpan?: number;
};

export const HEADER_ROW = 1;
export const HEADER_COLUMN = 2;

/**
 * Payload's table has no header section: a first row made only of header
 * cells becomes the <thead>, so its cells label the columns.
 */
export function splitTableHead<Row extends SerializedLexicalNode>(
  rows: Row[],
): { head: Row[]; body: Row[] } {
  const [first] = rows;
  const cells =
    first && "children" in first
      ? (first.children as Partial<SerializedTableCellNode>[])
      : [];
  const isHeaderRow =
    cells.length > 0 &&
    cells.every((cell) => (cell.headerState ?? 0) & HEADER_ROW);

  return rows.length > 1 && isHeaderRow
    ? { head: rows.slice(0, 1), body: rows.slice(1) }
    : { head: [], body: rows };
}
