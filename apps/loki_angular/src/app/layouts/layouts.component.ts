import { Component, Renderer2, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { LayoutHeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'loki-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    LayoutHeaderComponent,
  ],
})
export class LayoutsComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  readonly faCoffee = faCoffee;
  readonly faHouse = faHouse;

  isSidebarOpen = true;
  currentRoute = '';

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
