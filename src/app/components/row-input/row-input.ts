// row-input.ts
import { Component, signal, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgForOf } from '@angular/common';
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
    CardModule,
  ],
  templateUrl: './row-input.html',
  styleUrls: ['./row-input.css']
})
export class LinearRowComponent {
  @Input() label: string = "Количество элементов";

  // Приватный сигнал для внутреннего хранения значения variables
  private _variables = signal<number>(5);

  // Публичный сигнал, который можно изменять (например, через ngModel)
  // Инициализируем значением из _variables
  public variables = signal<number>(this._variables());

  public row = signal<number[]>(this.createRow(this._variables()));

  @Output() onSubmitForm = new EventEmitter<RowInput>();
  @Output() rowChange = new EventEmitter<number[]>(); // Добавляем Output

  // При получении initialVariables обновляем как _variables, так и публичный variables
  @Input() set initialVariables(value: number) {
    if (value !== undefined && value !== null && value > 0) {
      const clampedValue = Math.max(1, Math.min(20, value)); // Ограничиваем диапазон, как в шаблоне
      this._variables.set(clampedValue);
      this.variables.set(clampedValue); // Обновляем публичный сигнал
      this.updateRow(); // Обновляем строку в соответствии с новым значением
    }
  }

  updateRowAsync(): void {
    setTimeout(() => {
      this.updateRow();
    }, 1);
  }

  updateRow(): void {
    // Используем публичный сигнал variables для обновления строки
    const vars = this.variables();
    const currentRow = this.row();

    if (currentRow.length < vars) {
      this.row.set([...currentRow, ...Array(vars - currentRow.length).fill(0)]);
    } else if (currentRow.length > vars) {
      this.row.set(currentRow.slice(0, vars));
    }
    this.rowChange.emit(this.row()); // 🔥 Эмитим изменённую строку
  }

  private createRow(length: number): number[] {
    return Array(length).fill(0);
  }

  getVariableLabels(): string[] {
    // Используем публичный сигнал variables для получения длины меток
    return Array(this.variables()).fill(0).map((_, i) => `e${i + 1}`);
  }

  convertToForm(): RowInput {
    return {
      row: this.row()
    };
  }

  onSubmit(): void {
    const formData = this.convertToForm();
    this.onSubmitForm.emit(formData);
  }
}
