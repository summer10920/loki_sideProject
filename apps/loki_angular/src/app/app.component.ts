import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'loki_angular';

  constructor(private renderer: Renderer2) {
    const isDark = localStorage.getItem('darkMode') === 'true';
    this.setDarkMode(isDark);
  }


  toggleDarkMode(): void {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    this.setDarkMode(!isDark);
  }

  private setDarkMode(enable: boolean): void {
    const html = document.documentElement;
    if (enable) {
      this.renderer.addClass(html, 'dark');
    } else {
      this.renderer.removeClass(html, 'dark');
    }
    localStorage.setItem('darkMode', enable.toString());
  }
}
