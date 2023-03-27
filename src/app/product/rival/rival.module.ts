import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RivalComponent } from './rival.component';
import {ConfigModule} from "../config/config.module";
import {ReactiveFormsModule} from "@angular/forms";



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
    ReactiveFormsModule
  ]
})
export class RivalModule { }
