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
import {AuthGuard} from "../common/guard/auth.guard";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    MessagesModule,
    ButtonModule,
    MenuModule
  ],
  providers: [AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
