import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  AppRoutingModule,
  routingComponents,
} from './router/app-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { BaseUrlInterceptor } from './http/base-url.interceptor';

@NgModule({
  declarations: [AppComponent, ...routingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: 'BASE_API_URL',
      useValue: 'http://localhost:3000/api',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
