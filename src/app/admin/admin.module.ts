import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {IdAdminModule} from "./id-admin/id-admin.module";



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    IdAdminModule
  ]
})
export class AdminModule { }
