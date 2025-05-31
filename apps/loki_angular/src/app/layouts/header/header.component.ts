import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'loki-layout-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  imports: [FontAwesomeModule, CommonModule],
})
export class LayoutHeaderComponent implements OnInit {
  private renderer = inject(Renderer2);
  isDark = localStorage.getItem('darkMode') === 'true';

  readonly faSun = faSun;
  readonly faMoon = faMoon;

  ngOnInit(): void {
    this.setDarkMode(this.isDark);
  }

  toggleDarkMode(): void {
    this.setDarkMode(!document.documentElement.classList.contains('dark'));
  }

  private setDarkMode(enable: boolean): void {
    this.renderer[enable ? 'addClass' : 'removeClass'](
      document.documentElement,
      'dark'
    );

    localStorage.setItem('darkMode', enable.toString());
    this.isDark = enable;
  }
}
