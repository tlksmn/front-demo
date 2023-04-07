import {Component, Input, OnInit} from '@angular/core';
import {SellerT} from "../../../common/type/base/seller.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-id-seller',
  templateUrl: './id-seller.component.html',
  styleUrls: ['./id-seller.component.scss']
})
export class IdSellerComponent implements OnInit{
  @Input('seller') seller!: SellerT;
  sellerForm!: FormGroup
  constructor(private readonly formBuilder: FormBuilder) {}
  ngOnInit() {
    this.sellerForm = this.formBuilder.group({
      preOrderStatus: new FormControl(this.seller.preOrderStatus),
      rivalStatus: new FormControl(this.seller.rivalStatus),
      demotion: new FormControl(this.seller.demotion),
      promotion: new FormControl(this.seller.promotion)
    })
  }
}
