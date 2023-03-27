import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { SellerComponent } from './seller.component';

@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SellerModule { }
