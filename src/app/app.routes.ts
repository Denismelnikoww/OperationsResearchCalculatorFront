import { Routes } from '@angular/router';
import {SymplexPage} from './pages/symplex-page/symplex-page.component';
import {TransportPage} from './pages/transport-page/transport-page';

export const routes: Routes = [
  { path: 'symplex', component: SymplexPage },
  { path: 'transport', component: TransportPage },
];
