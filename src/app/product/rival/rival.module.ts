import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RivalComponent } from './rival.component';
import {ConfigModule} from "../config/config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    RivalComponent
  ],
  exports: [
    RivalComponent
  ],
  imports: [
    CommonModule,
    ConfigModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ButtonModule,
    RippleModule
  ]
})
export class RivalModule { }
