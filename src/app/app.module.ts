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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
