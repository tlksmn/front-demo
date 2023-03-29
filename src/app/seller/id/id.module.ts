import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdComponent } from './id.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



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
    ReactiveFormsModule
  ]
})
export class IdModule { }
