import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {FormsModule} from "@angular/forms";
import {ServiceModule} from "../../common/service/service.module";



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiceModule
  ]
})
export class AuthModule { }
