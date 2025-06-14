import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts/layouts.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,  LayoutsComponent, RouterModule],
  selector: 'loki-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
