import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { SellerComponent } from './seller.component';
import {IdModule} from "./id/id.module";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {ChipsModule} from "primeng/chips";
import {DockModule} from "primeng/dock";

@NgModule({
  declarations: [
    SellerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdModule,
    ButtonModule,
    PasswordModule,
    ChipsModule,
    DockModule
  ]
})
export class SellerModule { }
