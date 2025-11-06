interface SymplexResponse {
  canonForm: string[];
  iterations: IterationSnapshot[];
  optimum: string[];
}

interface IterationSnapshot {
  iterationNumber: number;
  table: number[][];
  rowNames: string[];
  columnNames: string[];
  pivotRow: number;
  pivotCol: number;
}
