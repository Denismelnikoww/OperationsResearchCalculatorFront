import {Component} from '@angular/core';
import {TableComponent} from '../../components/table-component/table-component';
import {LinearSystemComponent} from '../../components/linear-system-component/linear-system-component';


@Component({
  selector: 'app-symplex-component',
  imports: [
    TableComponent,
    LinearSystemComponent,
  ],
  templateUrl: './symplex-component.html',
  styleUrl: './symplex-component.css'
})
export class SymplexComponent {
}

