import { Component } from '@angular/core';
import {LinearRowComponent} from '../../components/row-input/row-input';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Card} from 'primeng/card';
import {TransportConditions} from '../../components/transport-conditions/transport-conditions';

@Component({
  selector: 'app-transport-page',
  imports: [
    LinearRowComponent,
    Button,
    Select,
    FormsModule,
    Card,
    TransportConditions
  ],
  templateUrl: './transport-page.html',
  styleUrl: './transport-page.css'
})
export class TransportPage {
 public fillMethods = ["Метод северо-западного угла","Метод минимизации"]
}
