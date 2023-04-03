import {Component} from '@angular/core';
import {SellerService} from "../../../common/service/seller.service";
import {catchError, map, NEVER, Observable, switchMap, throwError} from "rxjs";
import {SellerT} from "../../../common/type/base/seller.type";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../../common/notification/notification.service";
import {environment} from "../../../environments/environment";
import {CurrencyService} from "../../../common/service/currency.service";
import {CurrencyResponseApi} from "../../../common/type/api/currency/currency.type";

@Component({
  selector: 'app-seller-id',
  templateUrl: './seller-id.component.html',
  styleUrls: ['./seller-id.component.scss']
})
export class SellerIdComponent {
  constructor(
    private readonly sellerService: SellerService,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly currencyService: CurrencyService
  ) {}

  currencyRequest$: Observable<CurrencyResponseApi> = this.currencyService.get()
  request$: Observable<SellerT> = this.route.paramMap.pipe(
    map((paramMap) => +paramMap.get('id')!),
    switchMap((id) => {
      if (isNaN(id)) {
        return throwError('Продавец не найден')
      }
      return this.sellerService.getSellerById(id)
    }),
    catchError((e) => {
      this.notificationService.error(e)
      return NEVER
    })
  )
  async copy(type: string, sysId: string){
    await window.navigator.clipboard.writeText(`${environment.apiUrl}product/${type}/${sysId}`);
    this.notificationService.success('скопировано в буфер 🔥🚀')
  }
}
