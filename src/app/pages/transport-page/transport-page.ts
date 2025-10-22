import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TransportConditions} from '../../components/transport-conditions/transport-conditions';

@Component({
  selector: 'app-transport-page',
  imports: [
    FormsModule,
    TransportConditions
  ],
  templateUrl: './transport-page.html',
  styleUrl: './transport-page.css'
})
export class TransportPage {
}
