import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, catchError, NEVER, Subscription, tap} from "rxjs";

import {RivalConfigT} from "../../../common/type/base/rival.config.type";
import {ProductService} from "../../../common/service/product.service";
import {CityService} from "../../../common/service/city.service";
import {SellerService} from "../../../common/service/seller.service";
import {SellerT} from "../../../common/type/base/seller.type";

@Component({
  selector: 'app-rival',
  templateUrl: './rival.component.html',
  styleUrls: ['./rival.component.scss']
})
export class RivalComponent implements OnInit, OnDestroy {
  @Input('rival') rival!: RivalConfigT
  subscriptions: Subscription[] = [];
  rivalForm!: FormGroup;
  opened: boolean = false;
  showSaveBtn: boolean = false;
  minPriceEdited: boolean = false;
  priceEdited: boolean = false;
  modalOpened: boolean = false;
  seller$: BehaviorSubject<SellerT> = this.sellerService.currentSeller;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly messageService: MessageService,
    private readonly cityService: CityService,
    private readonly sellerService: SellerService
  ) {
  }

  ngOnInit() {
    this.rivalForm = this.formBuilder.group({
      minPrice: new FormControl(this.rival.minPrice),
      price: new FormControl(this.rival.price)
    })
    const subscription = this.rivalForm.valueChanges.pipe(tap(() => {
      this.showSaveBtn = true;
    })).subscribe();
    this.subscriptions.push(subscription);
  }


  getCityName(cityCode: string) {
    return this.cityService.getCityName(cityCode)?.cityRus || 'Банановый город'
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    });
    this.subscriptions = [];
  }

  getPosition(sellerSysId: string): number {
    const response = this.rival.rivalSeller?.offers?.findIndex((e) => {
      return e.merchantId === sellerSysId
    })
    return +(response >= 0 ? response + 1 : -1);
  }

  switchRivals(value: boolean) {
    this.opened = value;
  }

  submitForm() {
    const subscription = this.productService.updateRival({
      ...this.rivalForm.value,
      id: this.rival.id
    })
      .pipe(
        tap((value) => {
          Object.assign(this.rival, value);
          this.showSaveBtn = !this.showSaveBtn;
          this.priceEdited = false;
          this.minPriceEdited = false;
          this.messageService.add({summary: 'Обновление цены товара', detail: 'Данные обновлены', severity: 'success'})
        }),
        catchError((e) => {
          this.messageService.add({summary: 'Ошибка сервера', detail: e.error.message, severity: 'error'})
          this.priceEdited = false;
          this.minPriceEdited = false;
          return NEVER
        })
      ).subscribe();
    this.subscriptions.push(subscription);
  }

  editMinPrice() {
    this.minPriceEdited = true;
  }

  editPrice() {
    this.priceEdited = true;
  }

  showModal() {
    this.modalOpened = true;
  }

  protected readonly isNaN = isNaN;
}
