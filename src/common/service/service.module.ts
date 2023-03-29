import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {SellerService} from "./seller.service";
import {ProductService} from "./product.service";
import {CurrencyService} from "./currency.service";
import {AdminService} from "./admin.service";

@NgModule({
  providers: [ApiService,AuthService, SellerService, ProductService, CurrencyService, AdminService],
  imports: [HttpClientModule]
})
export class ServiceModule{}
