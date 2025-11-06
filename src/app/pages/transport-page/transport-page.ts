import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TransportConditions, TransportProblemData} from '../../components/transport-conditions/transport-conditions';
import {HttpService} from '../../api/http-service';
import {NgForOf, NgIf} from '@angular/common';
import {TableComponent} from '../../components/table-component/table-component';

@Component({
  selector: 'app-transport-page',
  imports: [
    FormsModule,
    TransportConditions,
    NgIf,
    TableComponent,
    NgForOf,
  ],
  templateUrl: './transport-page.html',
  styleUrl: './transport-page.css'
})
export class TransportPage {
  public tables: TransportTable[] | undefined;

  constructor(private httpService: HttpService) {
  }

  handleSolve(data: TransportProblemData): void {
    this.httpService.post<TransportProblemData, TransportTable[] >('/transport/solve', data).subscribe(
      response => {
      console.log(response);
      this.tables = response;
      },
      error => {
        console.error('Ошибка при решении задачи:', error);
      }
    );
  }
}
