import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, RouterModule,],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Симплекс-метод',
      routerLink: '/symplex',
    },
   {
      label: 'Транспортная задача',
      routerLink: '/'
    },
    {
      label: 'Графы',
      routerLink: '/'
    },
  ];
}
