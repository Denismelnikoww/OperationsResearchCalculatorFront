// linear-system-component.ts
import {Component, signal, Output, EventEmitter, ViewChild, TrackByFunction} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {SelectModule} from 'primeng/select';
import {NgFor, NgForOf, NgIf} from '@angular/common';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {LinearRowComponent} from "../row-input/row-input";

export interface LinearSystemForm {
  coefficients: number[][];
  constants: number[];
  constraints: string[];
  method: number;
  max: boolean;
  variables: number[];
  variableConstraints: string[];
  dot?: number[];
}

// Интерфейс для строки данных
interface SystemRow {
  coefficients: number[];
  constant: number;
  constraint: string;
}

@Component({
  selector: 'app-linear-system',
  standalone: true,
  imports: [
    InputNumberModule,
    SelectModule,
    FormsModule,
    NgForOf,
    CardModule,
    Button,
    LinearRowComponent,
    NgIf
  ],
  templateUrl: './linear-system-component.html',
  styleUrls: ['./linear-system-component.css']
})
export class LinearSystemComponent {
  private _equations = signal<number>(2);

  public equations = signal<number>(this._equations());

  private readonly MAX_EQUATIONS = 10;
  private readonly MAX_VARIABLES = 10

  private _allSystemRows = signal<SystemRow[]>(
    Array(this.MAX_EQUATIONS).fill(null).map(() => ({
      coefficients: Array(10).fill(0), // Максимум 10, как и было
      constant: 0,
      constraint: '='
    }))
  );

  private _allDotData = signal<number[]>(Array(this.MAX_VARIABLES).fill(0)); // <-- Добавили
  public dot = signal<number[]>(this._allDotData().slice(0, 2));

  // Публичный сигнал для отображаемых строк (срез)
  // Инициализируем с нужным количеством
  public systemRows = signal<SystemRow[]>(this._allSystemRows().slice(0, this._equations()).map(row => ({
    ...row,
    coefficients: row.coefficients.slice(0, this.initialCount) // initialCount из компонента
  })));

  public variableConstraints = signal<string[]>([]);
  public max = "→ max"
  public selectedMethod = 1;

  maxOptions = [
    {label: '→ max', value: 'max'},
    {label: '→ min', value: 'min'}
  ]
  methodOptions = [
    {label: 'Прямой симплекс-метод', value: 1},
    // {label: 'Одновременное решение прямой и двойственной задачи', value: 2},
    {label: 'Двойственный симплекс', value: 3},
    {label: 'Проверка оптимальности плана', value: 4}
  ];
  constraintOptions = [
    {label: '≥', value: '>='},
    {label: '≤', value: '<='},
    {label: '=', value: '='}
  ];
  variablesConstraintOptions = [
    {label: '≥ 0', value: '>='},
    {label: '≤ 0', value: '<='},
    {label: '∀', value: 'any'}
  ];

  @ViewChild('input', {static: true}) linearRowComponent!: LinearRowComponent;
  initialCount = 2;

  @Output() onSubmitForm = new EventEmitter<LinearSystemForm>();

  // trackBy для *ngFor, используем INDEX
  trackByRow: TrackByFunction<SystemRow> = (index: number, item: SystemRow): number => {
    return index;
  }

  onEquationsChange(): void { // Теперь только для уравнений
    let newEq = this.equations();
    const clampedEq = Math.max(1, Math.min(this.MAX_EQUATIONS, newEq));

    if (clampedEq !== newEq) {
      this.equations.set(clampedEq);
    }
    this._equations.set(clampedEq);

    // Обновляем отображаемые строки при изменении количества уравнений
    this.updateSystemDisplay();
  }

  // Этот метод будет вызываться, когда linearRowComponent обновляет количество переменных
  protected updateSystemDisplay(): void {
    const eq = this._equations();
    // Получаем текущее количество переменных из linearRowComponent
    const vars = this.linearRowComponent.row().length;
    const clampedVars = Math.max(1, Math.min(this.MAX_VARIABLES, vars));
    const newDotSlice = this._allDotData().slice(0, clampedVars); // <-- Берем срез из _allDotData
    this.dot.set(newDotSlice); // <-- Устанавливаем публичный сигнал dot
    const newRows = this._allSystemRows().slice(0, eq).map(row => ({
      ...row,
      coefficients: row.coefficients.slice(0, vars) // Обновляем коэффициенты
    }));
    this.systemRows.set(newRows);
  }

  onDotChange(index: number, value: number | null | undefined): void {
    const vars = this.linearRowComponent.row().length;
    const clampedIndex = Math.max(0, Math.min(this.MAX_VARIABLES - 1, index));

    if (index >= 0 && index < vars) {
      const valueToSet = value ?? 0;
      const currentAllDot = this._allDotData();
      const newAllDot = [...currentAllDot];
      newAllDot[clampedIndex] = valueToSet;
      this._allDotData.set(newAllDot);

      const currentVarsLength = this.linearRowComponent.row().length;
      const updatedDotSlice = this._allDotData().slice(0, currentVarsLength);
      this.dot.set(updatedDotSlice);
    }
  }


  onCoefficientChange(rowIndex: number, colIndex: number, value: number | null | undefined): void {
    const valueToSet = value ?? 0;
    // Используем длину linearRowComponent.row() для ограничения
    const currentVarsLength = this.linearRowComponent.row().length;
    if (rowIndex >= 0 && rowIndex < this.MAX_EQUATIONS && colIndex >= 0 && colIndex < currentVarsLength) {
      // Обновляем приватное хранилище
      const currentAllRows = this._allSystemRows();
      const rowToModify = currentAllRows[rowIndex];
      const newCoefficients = [...rowToModify.coefficients];
      newCoefficients[colIndex] = valueToSet;
      const newRowData = {...rowToModify, coefficients: newCoefficients};
      const newAllRows = [...currentAllRows];
      newAllRows[rowIndex] = newRowData;
      this._allSystemRows.set(newAllRows);

      // Обновляем ПУБЛИЧНЫЙ сигнал systemRows, заменив ССЫЛКУ на строку
      if (rowIndex < this._equations()) { // Только если строка видима
        const currentDisplayRows = this.systemRows();
        const newDisplayRow = {
          ...currentDisplayRows[rowIndex],
          coefficients: [...currentDisplayRows[rowIndex].coefficients] // Новый массив
        };
        newDisplayRow.coefficients[colIndex] = valueToSet; // Обновляем значение
        const newDisplayRows = [...currentDisplayRows];
        newDisplayRows[rowIndex] = newDisplayRow; // ЗАМЕНЯЕМ ссылку на строку
        this.systemRows.set(newDisplayRows); // Устанавливаем новый массив
      }
    }
  }

  onConstantChange(rowIndex: number, value: number | null | undefined): void {
    const valueToSet = value ?? 0;
    if (rowIndex >= 0 && rowIndex < this.MAX_EQUATIONS) {
      // Обновляем приватное хранилище
      const currentAllRows = this._allSystemRows();
      const rowToModify = currentAllRows[rowIndex];
      const newRowData = {...rowToModify, constant: valueToSet};
      const newAllRows = [...currentAllRows];
      newAllRows[rowIndex] = newRowData;
      this._allSystemRows.set(newAllRows);

      // Обновляем ПУБЛИЧНЫЙ сигнал systemRows
      if (rowIndex < this._equations()) {
        const currentDisplayRows = this.systemRows();
        const newDisplayRow = {...currentDisplayRows[rowIndex], constant: valueToSet};
        const newDisplayRows = [...currentDisplayRows];
        newDisplayRows[rowIndex] = newDisplayRow; // ЗАМЕНЯЕМ ссылку на строку
        this.systemRows.set(newDisplayRows);
      }
    }
  }

  onConstraintChange(rowIndex: number, value: string): void {
    if (value && rowIndex >= 0 && rowIndex < this.MAX_EQUATIONS) {
      // Обновляем приватное хранилище
      const currentAllRows = this._allSystemRows();
      const rowToModify = currentAllRows[rowIndex];
      const newRowData = {...rowToModify, constraint: value};
      const newAllRows = [...currentAllRows];
      newAllRows[rowIndex] = newRowData;
      this._allSystemRows.set(newAllRows);

      // Обновляем ПУБЛИЧНЫЙ сигнал systemRows
      if (rowIndex < this._equations()) {
        const currentDisplayRows = this.systemRows();
        const newDisplayRow = {...currentDisplayRows[rowIndex], constraint: value};
        const newDisplayRows = [...currentDisplayRows];
        newDisplayRows[rowIndex] = newDisplayRow; // ЗАМЕНЯЕМ ссылку на строку
        this.systemRows.set(newDisplayRows);
      }
    }
  }

  getVariableLabels(): string[] {
    // Получаем количество переменных из linearRowComponent
    const vars = this.linearRowComponent.row().length;
    return Array(vars).fill(0).map((_, i) => `x${i + 1}`);
  }

  convertToForm(): LinearSystemForm {
    const rows = this.systemRows();
    const coefficients = rows.map(row => row.coefficients);
    const constants = rows.map(row => row.constant);
    const constraints = rows.map(row => row.constraint);

    const currentDot = this.selectedMethod === 4 ? this.dot() : undefined;

    return {
      coefficients,
      constants,
      constraints,
      method: this.selectedMethod,
      max: this.max == "max",
      variables: this.linearRowComponent.row(), // Передаём массив переменных функции
      variableConstraints: this.variableConstraints(),
      dot: currentDot
    };
  }

  onSubmit(): void {
    const formData = this.convertToForm();
    this.onSubmitForm.emit(formData);
  }
}
