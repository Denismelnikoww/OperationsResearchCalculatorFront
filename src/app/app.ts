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
      label: '<h1>Симплекс-метод</h1>',
      routerLink: '/symplex',
    },
   {
      label: '<h1>Транспортная задача</h1>',
      routerLink: '/transport'
    },
    {
      label: '<h1>Графы</h1>',
      routerLink: '/'
    },
  ];
}
