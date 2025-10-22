// linear-system-component.ts
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { NgForOf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { LinearRowComponent } from "../row-input/row-input";
import { label } from '@primeuix/themes/aura/metergroup';
import { value } from '@primeuix/themes/aura/knob';

export interface LinearSystemForm {
  coefficients: number[][];
  constants: number[];
  constraints: string[];
  selectedMethod: number;
}

@Component({
  selector: 'app-linear-system',
  standalone: true,
  imports: [
    TableModule,
    InputNumberModule,
    SelectModule,
    FormsModule,
    NgForOf,
    CardModule,
    Button,
    LinearRowComponent
],
  templateUrl: './linear-system-component.html',
  styleUrls: ['./linear-system-component.css']
})
export class LinearSystemComponent {
  public equations = signal<number>(2);
  public variables = signal<number>(2);
  public coefficients = signal<number[][]>(this.createMatrix(2, 2));
  public constants = signal<number[]>(Array(2).fill(0));
  public constraints = signal<string[]>(Array(2).fill('='));
  public max  = signal<string>("→ max")
  public selectedMethod = 3;

  maxOptions = [
    {label: '→ max', value: 'max'},
    {label: '→ min', value: 'min'}
  ]
  methodOptions = [
    { label: 'Прямой симплекс-метод', value: "1" },
    { label: 'Одновременное решение прямой и двойственной задачи', value: "2" },
    { label: 'Двойственный симплекс', value: '3' }
  ];
  constraintOptions = [
    { label: '>', value: '>' },
    { label: '<', value: '<' },
    { label: '=', value: '=' }
  ];

  @Output() onSubmitForm = new EventEmitter<LinearSystemForm>();

  updateSystemAsync(): void {
    setTimeout(() => {
      this.updateSystem();
    }, 1);
  }

  updateSystem(): void {
    const eq = this.equations();
    const vars = this.variables();

    this.coefficients.set(this.createMatrix(eq, vars));

    const currentConstants = this.constants();
    if (currentConstants.length < eq) {
      this.constants.set([...currentConstants, ...Array(eq - currentConstants.length).fill(0)]);
    } else {
      this.constants.set(currentConstants.slice(0, eq));
    }

    const currentConstraints = this.constraints();
    if (currentConstraints.length < eq) {
      this.constraints.set([...currentConstraints, ...Array(eq - currentConstraints.length).fill('=')]);
    } else {
      this.constraints.set(currentConstraints.slice(0, eq));
    }
  }

  private createMatrix(rows: number, cols: number): number[][] {
    return Array(rows).fill(null).map(() => Array(cols).fill(0));
  }

  getVariableLabels(): string[] {
    return Array(this.variables()).fill(0).map((_, i) => `x${i + 1}`);
  }

  convertToForm(): LinearSystemForm {
    return {
      coefficients: this.coefficients(),
      constants: this.constants(),
      constraints: this.constraints(),
      selectedMethod: this.selectedMethod
    };
  }

  onSubmit(): void {
    const formData = this.convertToForm();
    this.onSubmitForm.emit(formData);
  }
}
