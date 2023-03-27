import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIdComponent } from './product-id.component';
import {RivalModule} from "../rival/rival.module";



@NgModule({
  declarations: [
    ProductIdComponent
  ],
  exports: [
    ProductIdComponent
  ],
  imports: [
    CommonModule,
    RivalModule
  ]
})
export class ProductIdModule { }
