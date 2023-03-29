import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ProductIdModule} from "./product-id/product-id.module";
import {ProductComponent} from './product.component';
import {SellerIdModule} from "./seller-id/seller-id.module";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductIdModule,
    SellerIdModule
  ]
})
export class ProductModule {
}
