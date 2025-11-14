import {Component} from '@angular/core';
import {HttpService} from '../../api/http-service';
import {
  LinearSystemComponent,
  LinearSystemForm
} from '../../components/linear-system-component/linear-system-component';
import {TableComponent} from '../../components/table-component/table-component';
import {Card} from 'primeng/card';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-symplex',
  templateUrl: './symplex-page.component.html',
  imports: [
    LinearSystemComponent,
    TableComponent,
    Card,
    NgIf
  ],
  styleUrls: ['./symplex-page.component.css']
})
export class SymplexPage {
  public iterations: IterationSnapshot[] | undefined = undefined;
  public canonForm: string[] | undefined = undefined;
  public optimum: string[] | undefined = undefined;
  public  method:number = 1 ;

  constructor(private httpService: HttpService) {
  }

  onSubmitForm(formData: LinearSystemForm) {
    this.httpService.post<LinearSystemForm, SymplexResponse>('/symplex/lineartask', formData).subscribe(
      response => {
        this.iterations = response.iterations;
        this.canonForm = response.canonForm;
        this.optimum = response.optimum;
        this.method = formData.method;
        console.log(response);
      },
      error => {
        console.error('Ошибка при решении системы:', error);
      }
    );
  }
}
