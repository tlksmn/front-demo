import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ProductIdModule} from "./product-id/product-id.module";
import {ProductComponent} from './product.component';
import {SellerIdModule} from "./seller-id/seller-id.module";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductIdModule,
    SellerIdModule,
    ButtonModule,
    DropdownModule
  ]
})
export class ProductModule {
}
