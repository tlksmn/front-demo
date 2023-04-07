import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdSellerComponent } from './id-seller.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    IdSellerComponent
  ],
  exports: [
    IdSellerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class IdSellerModule { }
