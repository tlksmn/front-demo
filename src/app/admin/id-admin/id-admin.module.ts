import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdAdminComponent } from './id-admin.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    IdAdminComponent
  ],
  exports: [
    IdAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class IdAdminModule { }
