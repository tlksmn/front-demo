import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {SellerResponseApiT} from "../type/api/seller/seller.type";
import {LogoutMessageT, SignInT} from "../type/api/auth/auth.type";
import {SellerT} from "../type/base/seller.type";
import {UpdateSellerT} from "../type/api/seller/update.seller.type";
import {BehaviorSubject, Subject, tap} from "rxjs";

@Injectable()
export class SellerService {
  public currentSeller: BehaviorSubject<SellerT> = new BehaviorSubject<SellerT>({} as SellerT);

  constructor(private readonly apiService: ApiService) {
  }


  getList() {
    return this.apiService.get<SellerResponseApiT>('seller/list', {})
  }

  addSeller(data: SignInT) {
    return this.apiService.post<LogoutMessageT, SignInT>('seller/add', data, {})
  }

  getSellerById(id: number) {
    return this.apiService.get<SellerT>(`seller/${id}`, {})
      .pipe(
        tap(e => this.currentSeller.next(e)),
      )
  }

  updateSeller(data: UpdateSellerT) {
    return this.apiService.post<SellerT, UpdateSellerT>('seller/update', data, {})
  }
}

