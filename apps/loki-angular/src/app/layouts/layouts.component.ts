import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutHeaderComponent } from './header/header.component';
import { AsideMenuComponent } from './aside-menu/aside-menu.component';

@Component({
  standalone: true,
  selector: 'loki-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  imports: [
    CommonModule,
    FontAwesomeModule,
    LayoutHeaderComponent,
    AsideMenuComponent,
  ],
})
export class LayoutsComponent {}
