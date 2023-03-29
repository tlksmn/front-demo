import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { SellerComponent } from './seller.component';
import {IdModule} from "./id/id.module";

@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdModule
  ]
})
export class SellerModule { }
