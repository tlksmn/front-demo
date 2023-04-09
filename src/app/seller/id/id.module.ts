import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdComponent } from './id.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";



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
    ButtonModule
  ]
})
export class IdModule { }
