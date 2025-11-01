// row-input.ts
import { Component, signal, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgForOf, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';

export interface RowInput {
  row: number[];
}

@Component({
  selector: 'app-row-input',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    NgForOf,
    NgIf,
    CardModule,
  ],
  templateUrl: './row-input.html',
  styleUrls: ['./row-input.css']
})
export class LinearRowComponent {
  @Input() label: string = "Количество элементов";
  @Input() haveLabel: boolean = true;
  @Input() haveText: boolean = false;
  @Input() text: string = "Текст";

  // Приватный сигнал для внутреннего хранения значения variables (количество видимых элементов)
  private _variables = signal<number>(5);

  // Публичный сигнал, который можно изменять (например, через ngModel)
  public variables = signal<number>(this._variables());

  // Общий массив для хранения всех возможных значений (до 10)
  // Инициализируем 10 нулями
  private _allValues = signal<number[]>(Array(10).fill(0));

  // Публичный сигнал для текущей отображаемой строки, зависящий от _allValues и variables
  // Он будет обновляться автоматически при изменении _allValues или variables
  public row = signal<number[]>(this._allValues().slice(0, this.variables()));

  @Output() onSubmitForm = new EventEmitter<RowInput>();
  @Output() rowChange = new EventEmitter<number[]>(); // Добавляем Output

  // При получении initialVariables обновляем _variables и variables
  @Input() set initialVariables(value: number) {
    if (value !== undefined && value !== null && value > 0) {
      const clampedValue = Math.max(1, Math.min(10, value)); // Ограничиваем диапазон до 10
      this._variables.set(clampedValue);
      this.variables.set(clampedValue);
      this.updateRowDisplay(); // Обновляем отображаемую строку
    }
  }

  // Функция, вызываемая при изменении количества элементов через InputNumber
  onVariablesChange(): void {
    const newVars = this.variables();
    // Ограничиваем значение диапазоном 1-10
    const clampedNewVars = Math.max(1, Math.min(10, newVars));
    if (clampedNewVars !== newVars) {
      this.variables.set(clampedNewVars);
    }
    this._variables.set(clampedNewVars); // Обновляем приватное значение
    this.updateRowDisplay(); // Обновляем отображение
  }

  // Обновляет только отображаемую часть row на основе _allValues и текущего _variables
  private updateRowDisplay(): void {
    const vars = this._variables();
    // Берем срез из _allValues
    const newRow = this._allValues().slice(0, vars);
    this.row.set(newRow);
    // Обязательно эмитим изменение row
    this.rowChange.emit(this.row());
  }

  // Обновляет внутреннее хранилище _allValues при изменении значений inputNumber
  onValueChange(index: number, value: number): void {
    // Убеждаемся, что индекс в пределах 0-9
    if (index >= 0 && index < 10) {
      const currentAllValues = this._allValues();
      // Создаем новый массив, чтобы сигнал отследил изменение
      const newAllValues = [...currentAllValues];
      newAllValues[index] = value;
      this._allValues.set(newAllValues);

      // Если изменение произошло в отображаемой части, обновляем row и эмитим событие
      if (index < this._variables()) {
        this.updateRowDisplay(); // Это вызовет rowChange.emit
      }
    }
  }

  getVariableLabels(): string[] {
    // Используем приватный сигнал _variables для получения длины меток
    return Array(this._variables()).fill(0).map((_, i) => `e${i + 1}`);
  }
}
