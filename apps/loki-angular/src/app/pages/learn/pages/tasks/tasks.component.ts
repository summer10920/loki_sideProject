import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loki-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {}
