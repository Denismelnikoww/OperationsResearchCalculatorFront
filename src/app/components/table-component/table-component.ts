import { Component, Input } from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Card} from 'primeng/card';

export type TableData = any[][];

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [NgClass, NgForOf, Card, JsonPipe, NgIf],
  templateUrl: './table-component.html',
  styleUrls: ['./table-component.css']
})
export class TableComponent {
  @Input() stroke: string = "";
  @Input() haveStroke: boolean = false;
  @Input() data: TableData = [];
  @Input() columns: string[] = [];
  @Input() rowNames: string[] = [];
  @Input() highlightedRow?: number;
  @Input() highlightedColumn?: number;
   @Input() set selectedCells(cells: Cell[] | null) {
    this._selectedCells = cells || [];
  }
  get selectedCells(): Cell[] {
    return this._selectedCells;
  }
  private _selectedCells: Cell[] = [];

  isSelected(rowIndex: number, colIndex: number): boolean {
    return this.selectedCells.some(cell => cell.row === rowIndex && cell.column === colIndex);
  }
}
