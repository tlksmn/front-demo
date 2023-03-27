import {Component, Input} from '@angular/core';
import {ProductT} from "../../../common/type/base/product.type";

@Component({
  selector: 'app-product-id',
  templateUrl: './product-id.component.html',
  styleUrls: ['./product-id.component.scss']
})
export class ProductIdComponent {
 @Input('product') product!: ProductT
  opened: boolean = false

  switchRivals(value: boolean){
   this.opened = value
  }
  openProduct(){
   window.open(this.product.url, '_blank')
  }
}
