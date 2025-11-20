interface SymplexResponse {
  canonForm: string[];
  iterations: IterationSnapshot[];
  optimum: string[];
  result: string[];
}

interface IterationSnapshot {
  iterationNumber: number;
  table: number[][];
  rowNames: string[];
  columnNames: string[];
  pivotRow: number;
  pivotCol: number;
}
