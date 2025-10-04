import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {NgForOf} from '@angular/common';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-table-component',
  imports: [
    TableModule,
    NgForOf,
    Card,
  ],
  templateUrl: './table-component.html',
  styleUrl: './table-component.css'
})
export class TableComponent {
  // Данные для таблицы
  rows = ['Row1', 'Row2', 'Row3', 'Row4'];
  columns = ['Column1', 'Column2','Column4','Column4'];

  getCellData(row: string, col: string): string {
    return `${row}-${col}`;
  }
}
