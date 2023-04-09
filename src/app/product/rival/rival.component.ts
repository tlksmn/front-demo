import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {catchError, NEVER, Subscription, tap} from "rxjs";

import {RivalConfigT} from "../../../common/type/base/rival.config.type";
import {ProductService} from "../../../common/service/product.service";

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


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.rivalForm = this.formBuilder.group({
      minPrice: new FormControl(this.rival.minPrice),
      price: new FormControl(this.rival.price)
    })
    const subscription = this.rivalForm.valueChanges.pipe(tap(() => {
      this.showSaveBtn = true;
    })).subscribe()
    this.subscriptions.push(subscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    });
    this.subscriptions = [];
  }

  switchRivals(value: boolean) {
    this.opened = value
  }

  submitForm() {
    const subscription = this.productService.updateRival({...this.rivalForm.value, id: this.rival.id})
      .pipe(
        tap((value) => {
          Object.assign(this.rival, value);
          this.showSaveBtn = !this.showSaveBtn;
          this.messageService.add({summary:'Обновление цены товара' , detail: 'Данные обновлены', severity: 'success'})
        }),
        catchError((e)=> {
          this.messageService.add({summary: 'Ошибка сервера', detail: e.error.message, severity: 'error'})
          return NEVER
        })
      ).subscribe()
    this.subscriptions.push(subscription)
  }
  editMinPrice(){
    this.minPriceEdited = true
  }
  editPrice(){
    this.priceEdited = true
  }
}
