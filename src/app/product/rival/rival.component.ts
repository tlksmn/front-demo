import {Component, Input, OnInit} from '@angular/core';
import {RivalConfigT} from "../../../common/type/base/rival.config.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rival',
  templateUrl: './rival.component.html',
  styleUrls: ['./rival.component.scss']
})
export class RivalComponent implements OnInit{
  @Input('rival') rival!: RivalConfigT

  rivalForm!: FormGroup
  opened: boolean = false

  constructor( private readonly formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.rivalForm = this.formBuilder.group({
      minPrice: new FormControl(this.rival.minPrice),
      price: new FormControl(this.rival.price)
    })
  }

  switchRivals(value: boolean){
    this.opened = value
  }
}
