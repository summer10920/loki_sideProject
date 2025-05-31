import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts/layouts.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutsComponent],
  selector: 'loki-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
