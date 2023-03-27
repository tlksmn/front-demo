import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {SellerResponseApiT} from "../type/api/seller/seller.type";
import {LogoutMessageT, SignInT} from "../type/api/auth/auth.type";

@Injectable()
export class SellerService{
  constructor(private readonly apiService: ApiService) {}

  getList(){
    return this.apiService.get<SellerResponseApiT>('seller/list', {})
  }

  addSeller(data: SignInT){
    return this.apiService.post<LogoutMessageT, SignInT>('seller/add', data, {})
  }
}

