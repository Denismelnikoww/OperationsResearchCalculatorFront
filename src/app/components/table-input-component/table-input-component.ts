import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

export type TableData = number[][];

// Максимальный размер таблицы
const MAX_SIZE = 10;

@Component({
  selector: 'app-table-input',
  standalone: true,
  imports: [
    FormsModule,
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

  // Храним все возможные данные в таблице 10x10
  private fullTableData: TableData = Array(MAX_SIZE).fill(0).map(() => Array(MAX_SIZE).fill(0));
  displayedRowHeaders: string[] = [];
  displayedColHeaders: string[] = [];

  // Данные, отображаемые в текущем представлении
  currentViewData: TableData = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows'] || changes['cols'] || changes['rowHeaders'] || changes['colHeaders']) {
      this.updateHeaders();
      this.updateViewData();
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

  updateViewData() {
    this.currentViewData = [];
    for (let i = 0; i < this.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.cols; j++) {
        // Используем данные из fullTableData, даже если они были до изменения размеров
        row.push(this.fullTableData[i][j]);
      }
      this.currentViewData.push(row);
    }
    // Не эмитим здесь, т.к. данные могут не измениться, а только отображение
    // Эмит будет при изменении значения в ячейке
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  onCellValueChange(row: number, col: number, value: number | null) {
    if (value === null || value === undefined) value = 0;
    // Обновляем значение в хранилище
    this.fullTableData[row][col] = value;

    const newRow = [...this.currentViewData[row]];
    newRow[col] = value;
    const newViewData = [...this.currentViewData];
    newViewData[row] = newRow;

    // Присваиваем новую ссылку на массив
    this.currentViewData = newViewData;

    this.dataChange.emit(this.getCurrentTableData());
  }

  getCurrentTableData(): TableData {
    const data: TableData = [];
    for (let i = 0; i < this.rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(this.fullTableData[i][j]);
      }
      data.push(row);
    }
    return data;
  }

  getData(): TableData {
    return this.getCurrentTableData();
  }
}
