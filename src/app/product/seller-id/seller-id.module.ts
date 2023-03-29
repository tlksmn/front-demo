import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerIdComponent } from './seller-id.component';



@NgModule({
  declarations: [
    SellerIdComponent
  ],
  exports: [
    SellerIdComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SellerIdModule { }
