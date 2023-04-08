import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';

import { AuthComponent } from './auth.component';
import {ServiceModule} from "../../common/service/service.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiceModule,
    PasswordModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [MessageService]
})
export class AuthModule { }
