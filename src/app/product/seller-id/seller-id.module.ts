import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerIdComponent } from './seller-id.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    SellerIdComponent
  ],
  exports: [
    SellerIdComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ]
})
export class SellerIdModule { }
