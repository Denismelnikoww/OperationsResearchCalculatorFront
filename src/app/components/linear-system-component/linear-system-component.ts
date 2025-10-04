import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { NgForOf} from '@angular/common';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-linear-system',
  standalone: true,
  imports: [
    TableModule,
    InputNumberModule,
    SliderModule,
    FormsModule,
    NgForOf,
    CardModule,
  ],
  templateUrl: './linear-system-component.html',
  styleUrls: ['./linear-system-component.css']
})
export class LinearSystemComponent {
  public canChange = true;
  public equations = signal<number>(2);
  public variables = signal<number>(2);

  public coefficients = signal<number[][]>(this.createMatrix(2, 2));
  public constants = signal<number[]>(Array(2).fill(0));

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
    } else if (currentConstants.length > eq) {
      this.constants.set(currentConstants.slice(0, eq));
    }
  }

  private createMatrix(rows: number, cols: number): number[][] {
    return Array(rows).fill(null).map(() => Array(cols).fill(0));
  }

  getVariableLabels(): string[] {
    return Array(this.variables()).fill(0).map((_, i) => `x${i + 1}`);
  }
}
