interface TableResponse {
  iterationNumber: number;
  table: any[][];
  columnNames: string[];
  rowNames: string[];
  pivotRow: number;
  pivotCol: number;
}
