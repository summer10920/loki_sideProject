import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';

@Component({
  imports: [LayoutsComponent, RouterModule],
  selector: 'loki-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'loki-angular-cli';
}
