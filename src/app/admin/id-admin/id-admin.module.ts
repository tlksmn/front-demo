import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdAdminComponent } from './id-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IdSellerModule} from "../id-seller/id-seller.module";



@NgModule({
  declarations: [
    IdAdminComponent
  ],
  exports: [
    IdAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IdSellerModule
  ]
})
export class IdAdminModule { }
