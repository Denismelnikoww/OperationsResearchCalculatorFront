import { NgClass, NgForOf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './table-input-component.html',
  styleUrls: ['./table-input-component.css'],
})
export class TableInputComponent {
  @Input() rows: number = 3;
  @Input() cols: number = 3;

  @Output() dataChange = new EventEmitter<TableData>();

  tableData: TableData = [];

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges() {
    this.initializeTable();
  }

  initializeTable() {
    this.tableData = Array(this.rows)
      .fill(0)
      .map(() => Array(this.cols).fill(0));
  }

  onCellValueChange(row: number, col: number, value: number | null) {
    if (value === null || value === undefined) value = 0;
    this.tableData[row][col] = value;
  }

  // Метод, который будет вызываться извне для получения данных
  getData(): TableData {
    return this.tableData;
  }
}