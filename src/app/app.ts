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
      label: '<h2>Симплекс-метод</h2>',
      routerLink: '/symplex',
    },
   {
      label: '<h2>Транспортная задача</h2>',
      routerLink: '/transport'
    },
    {
      label: '<h2>Графы</h2>',
      routerLink: '/'
    },
  ];
}
