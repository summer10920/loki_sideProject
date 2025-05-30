import { AfterViewInit, Component, ElementRef, HostBinding, inject, Renderer2 } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxHttpModule } from 'devextreme-angular/http';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { UnauthenticatedContentModule } from './unauthenticated-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ]
})
export class AppComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  @HostBinding('class') get getClass() {
    const sizeClassName = Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
    return `${sizeClassName} app`;
  }

  ngAfterViewInit(): void {
    //關閉那個未授權的theme序號
    (document.querySelector('dx-license div[style*="cursor: pointer"]') as HTMLElement)?.click();
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
