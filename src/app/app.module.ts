import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from "primeng/messages";


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotificationModule} from "../common/notification/notification.module";
import {AuthGuard} from "../common/guard/auth.guard";

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
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
