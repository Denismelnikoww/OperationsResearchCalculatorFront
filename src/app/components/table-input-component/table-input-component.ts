import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

export type TableData = number[][];

@Component({
  selector: 'app-table-input',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    InputNumberModule,
    CardModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './table-input-component.html',
  styleUrls: ['./table-input-component.css'],
})
export class TableInputComponent implements OnChanges {
  @Input() rows: number = 3;
  @Input() cols: number = 3;
  @Input() rowHeaders: string[] = [];
  @Input() colHeaders: string[] = [];

  @Output() dataChange = new EventEmitter<TableData>();

  tableData: TableData = [];
  // Массивы для заголовков по умолчанию, если не переданы
  displayedRowHeaders: string[] = [];
  displayedColHeaders: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows'] || changes['cols'] || changes['rowHeaders'] || changes['colHeaders']) {
      this.updateHeaders();
      this.initializeTable();
    }
  }

  updateHeaders() {
    this.displayedRowHeaders = this.rowHeaders.length >= this.rows
      ? this.rowHeaders.slice(0, this.rows)
      : Array.from({ length: this.rows }, (_, i) => `Row ${i + 1}`);

    this.displayedColHeaders = this.colHeaders.length >= this.cols
      ? this.colHeaders.slice(0, this.cols)
      : Array.from({ length: this.cols }, (_, j) => `Col ${j + 1}`);
  }

  initializeTable() {
    this.tableData = Array(this.rows)
      .fill(0)
      .map(() => Array(this.cols).fill(0));
    this.dataChange.emit(this.tableData);
  }

  onCellValueChange(row: number, col: number, value: number | null) {
    if (value === null || value === undefined) value = 0;
    this.tableData[row][col] = value;
    this.dataChange.emit(this.tableData); // Emit updated data
  }

  getData(): TableData {
    return this.tableData;
  }
}
