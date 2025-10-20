import {Component, signal, Output, EventEmitter, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgForOf} from '@angular/common';
import {CardModule} from 'primeng/card';

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
  @Input() text = ""
  public variables = signal<number>(5);
  public row = signal<number[]>(this.createRow(5));

  @Output() onSubmitForm = new EventEmitter<RowInput>();

  updateRowAsync(): void {
    setTimeout(() => {
      this.updateRow();
    }, 1);
  }

  updateRow(): void {
    const vars = this.variables();
    const currentRow = this.row();

    if (currentRow.length < vars) {
      this.row.set([...currentRow, ...Array(vars - currentRow.length).fill(0)]);
    } else if (currentRow.length > vars) {
      this.row.set(currentRow.slice(0, vars));
    }
  }

  private createRow(length: number): number[] {
    return Array(length).fill(0);
  }

  getVariableLabels(): string[] {
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
