import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TransportConditions, TransportProblemData} from '../../components/transport-conditions/transport-conditions';
import {HttpService} from '../../api/http-service';

@Component({
  selector: 'app-transport-page',
  imports: [
    FormsModule,
    TransportConditions,
  ],
  templateUrl: './transport-page.html',
  styleUrl: './transport-page.css'
})
export class TransportPage {

  constructor(private httpService: HttpService) {
  }

  handleSolve(data: TransportProblemData): void {
    this.httpService.post<TransportProblemData, TransportProblemData>('/transport/solve', data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Ошибка при решении задачи:', error);
      }
    );
  }
}
