import { Component, Output, EventEmitter, ViewChild, signal, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { LinearRowComponent, RowInput } from '../row-input/row-input';
import { TableInputComponent, TableData } from '../table-input-component/table-input-component';

export interface TransportProblemData {
  suppliers: number[];
  buyers: number[];
  costs: number[][];
  method: number;
}

@Component({
  selector: 'app-transport-conditions',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    LinearRowComponent,
    SelectModule,
    FormsModule,
    TableInputComponent
  ],
  templateUrl: './transport-conditions.html',
  styleUrl: './transport-conditions.css'
})
export class TransportConditions {
  @Output() onSolveForm = new EventEmitter<TransportProblemData>();

  selectedFillMethod: number = 0;
  fillMethodOptions = [
    { label: "Метод северо-западного угла", value: 2 },
    { label: "Метод минимизации", value: 1 }
  ];

  @ViewChild('suppliersInput', { static: true }) suppliersInputComponent!: LinearRowComponent;
  @ViewChild('buyersInput', { static: true }) buyersInputComponent!: LinearRowComponent;

  initialSuppliersCount = 2;
  initialBuyersCount = 2;

  suppliersCount = signal<number>(this.initialSuppliersCount);
  buyersCount = signal<number>(this.initialBuyersCount);
  suppliersHeaders = signal<string[]>([]);
  buyersHeaders = signal<string[]>([]);
  costMatrix = signal<TableData>([]);

  constructor() {
    effect(() => {
      const suppliersRow = this.suppliersInputComponent.row();
      this.suppliersCount.set(suppliersRow.length);
      this.suppliersHeaders.set(suppliersRow.map((_, i) => `Поставщик ${i + 1}`));
    });

    effect(() => {
      const buyersRow = this.buyersInputComponent.row();
      this.buyersCount.set(buyersRow.length);
      this.buyersHeaders.set(buyersRow.map((_, j) => `Покупатель ${j + 1}`));
    });
  }

  onCostMatrixChange(data: TableData) {
    this.costMatrix.set(data);
  }

  onSolve(): void {
    if (!this.suppliersInputComponent || !this.buyersInputComponent) {
      console.error('Дочерние компоненты не найдены');
      return;
    }

    const suppliersRow = this.suppliersInputComponent.row();
    const buyersRow = this.buyersInputComponent.row();

    if (suppliersRow.length === 0) {
      console.warn('Строка поставщиков пуста');
      return;
    }
    if (buyersRow.length === 0) {
      console.warn('Строка покупателей пуста');
      return;
    }
    if (!this.selectedFillMethod) {
      console.warn('Метод не выбран');
      return;
    }

    const currentMatrix = this.costMatrix();

    const formData: TransportProblemData = {
      suppliers: suppliersRow,
      buyers: buyersRow,
      costs: currentMatrix,
      method:  this.selectedFillMethod
    };

    this.onSolveForm.emit(formData);
    console.log('Отправляемые данные:', formData);
  }
}
