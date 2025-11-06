interface Cell {
  row: number;
  column: number;
  isPlus: boolean;
}

interface TransportTable {
  sellers: string[];
  buyers: string[];
  table: string[][];
  selectedCells: Cell[];
  stroke: string;
}
