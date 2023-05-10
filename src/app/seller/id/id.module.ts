import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdComponent } from './id.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {DockModule} from "primeng/dock";



@NgModule({
  declarations: [
    IdComponent
  ],
  exports: [
    IdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    DockModule
  ]
})
export class IdModule { }
