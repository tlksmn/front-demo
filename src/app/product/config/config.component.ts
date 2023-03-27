import {Component, Input, OnInit} from '@angular/core';
import {PointConfigT} from "../../../common/type/base/point.config.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit{
  @Input('config') configPoint!: PointConfigT
  constructor(private readonly formBuilder: FormBuilder) {}
  configForm!: FormGroup

  ngOnInit() {
    this.configForm = this.formBuilder.group({
      preOrder: new FormControl(this.configPoint.preOrder),
      available: new FormControl(this.configPoint.available),
    })
  }
}
