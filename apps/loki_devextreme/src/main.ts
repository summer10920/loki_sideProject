import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService, ScreenService, AppInfoService, AuthGuardService } from './app/shared/services';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxHttpModule } from 'devextreme-angular/http';
import themes from 'devextreme/ui/themes';

const providers = [
  importProvidersFrom(BrowserModule),
  importProvidersFrom(DxHttpModule),
  provideRouter(routes),
  provideHttpClient(withFetch()),
  AuthService,
  ScreenService,
  AppInfoService,
  AuthGuardService
];

themes.initialized(() => {
  bootstrapApplication(AppComponent, { providers })
    .catch(err => console.error(err));
});
