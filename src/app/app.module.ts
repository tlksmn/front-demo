import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotificationModule} from "../common/notification/notification.module";
import {AuthGuard} from "../common/guard/auth.guard";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationModule,
    BrowserAnimationsModule,
    ToastModule,
    MessagesModule
  ],
  providers: [AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
