import {Component} from '@angular/core';
import {catchError, map, NEVER, Observable, switchMap, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";

import {SellerService} from "../../../common/service/seller.service";
import {SellerT} from "../../../common/type/base/seller.type";
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
    private readonly currencyService: CurrencyService,
    private readonly messageService: MessageService
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
      this.messageService.add({detail: e.error.statusCode, summary: e.error.message, severity: 'error'})
      return NEVER
    })
  )
  async copy(type: string, sysId: string){
    await window.navigator.clipboard.writeText(`${environment.fileUrl}${type}/${sysId}`);
    this.messageService.add({detail: 'Ссылка скопировано в буфер.', summary: 'Буфер обмена', severity: 'success'})
  }
}
