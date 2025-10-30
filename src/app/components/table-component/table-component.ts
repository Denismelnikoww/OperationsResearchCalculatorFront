import { Component, Input } from '@angular/core';
import {JsonPipe, NgClass, NgForOf} from '@angular/common';
import {Card} from 'primeng/card';

export type TableData = number[][];

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [NgClass, NgForOf, Card, JsonPipe],
  templateUrl: './table-component.html',
  styleUrls: ['./table-component.css']
})
export class TableComponent {
  @Input() data: TableData = [];
  @Input() columns: string[] = [];
  @Input() rowNames: string[] = [];
  @Input() highlightedRow?: number;
  @Input() highlightedColumn?: number;
}
