import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { MenuConfig } from '../menu.config';

@Component({
  standalone: true,
  selector: 'loki-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class AsideMenuComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  isSidebarOpen = true;
  currentRoute = '';
  readonly menuConfig = MenuConfig;
  readonly iconMap: Record<string, IconDefinition> = {
    faHouse,
    faCoffee,
  };

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateToPage(route: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isSidebarOpen && this.router.navigate([route]);
    this.toggleSidebar();
  }
} 