import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ConfigComponent
  ],
  exports: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ConfigModule { }
