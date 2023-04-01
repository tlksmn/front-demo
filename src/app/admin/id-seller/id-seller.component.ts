import {Component, Input} from '@angular/core';
import {SellerT} from "../../../common/type/base/seller.type";

@Component({
  selector: 'app-id-seller',
  templateUrl: './id-seller.component.html',
  styleUrls: ['./id-seller.component.scss']
})
export class IdSellerComponent {
  @Input('seller') seller!: SellerT;

}
