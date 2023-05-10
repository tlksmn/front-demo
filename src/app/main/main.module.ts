import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    CardModule
  ]
})
export class MainModule { }
