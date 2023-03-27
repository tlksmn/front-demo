import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ProductIdModule} from "./product-id/product-id.module";
import {ProductComponent} from './product.component';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductIdModule
  ]
})
export class ProductModule {
}
