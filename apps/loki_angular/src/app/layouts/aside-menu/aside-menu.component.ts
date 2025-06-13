import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { MenuConfig } from '../menu.config';

@Component({
  standalone: true,
  selector: 'loki-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss',
  imports: [CommonModule, FontAwesomeModule]
})
export class AsideMenuComponent implements OnInit {
  private router = inject(Router);

  isSidebarOpen = signal(true);
  currentRoute = signal('');
  readonly menuConfig = MenuConfig;
  readonly iconMap: Record<string, IconDefinition> = {
    faHouse,
    faCoffee,
  };

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((value) => !value);
  }

  navigateToPage(route: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isSidebarOpen() && this.router.navigate([route]);
    this.toggleSidebar();
  }
}
