import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {LinearRowComponent} from '../row-input/row-input';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-transport-conditions',
  imports: [
    Button,
    Card,
    LinearRowComponent,
    Select,
    FormsModule
  ],
  templateUrl: './transport-conditions.html',
  styleUrl: './transport-conditions.css'
})
export class TransportConditions {
  public selectedFillMethod: string = ""
  public fillMethodOptions = [
    {label: "Метод северо-западного угла", value: "northwest"},
    {label: "Метод минимизации", value: "minimization"}
  ];
}
