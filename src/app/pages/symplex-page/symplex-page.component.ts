import {Component} from '@angular/core';
import {HttpService} from '../../api/http-service';
import {
  LinearSystemComponent,
  LinearSystemForm
} from '../../components/linear-system-component/linear-system-component';
import {TableComponent} from '../../components/table-component/table-component';

@Component({
  selector: 'app-symplex',
  templateUrl: './symplex-page.component.html',
  imports: [
    LinearSystemComponent,
    TableComponent
  ],
  styleUrls: ['./symplex-page.component.css']
})
export class SymplexPage {
  public tables: TableResponse[] = [];

  constructor(private httpService: HttpService) {
  }

  onSubmitForm(formData: LinearSystemForm) {
    this.httpService.post<LinearSystemForm, TableResponse[]>('/api/solve', formData).subscribe(
      response => {
        this.tables = response; // теперь response — массив
      },
      error => {
        console.error('Ошибка при решении системы:', error);
      }
    );
  }
}
