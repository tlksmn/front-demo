import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {MessageService} from "primeng/api";

import {PointConfigT} from "../../../common/type/base/point.config.type";
import {ProductService} from "../../../common/service/product.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
  @Input('config') configPoint!: PointConfigT

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly messageService: MessageService
  ) {
  }

  configForm!: FormGroup
  showSaveBtn: boolean = false;
  subscriptions: Subscription[] = []

  ngOnInit() {
    this.configForm = this.formBuilder.group({
      preOrder: new FormControl(this.configPoint.preOrder),
      available: new FormControl(this.configPoint.available),
    })
    const subscription = this.configForm.valueChanges.pipe(tap(() => {
        this.showSaveBtn = true;
      })
    ).subscribe()
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe()
    })
    this.subscriptions = [];
  }

  submitForm() {
    const subscription = this.productService.updatePoint({...this.configForm.value, id: this.configPoint.id})
      .pipe(
        tap((value) => {
          Object.assign(this.configPoint, value)
          this.showSaveBtn = !this.showSaveBtn
          this.messageService.add({summary:'Обновление наличия и предзака товара' , detail: 'Данные обновлены', severity: 'success'})
        }),
        catchError((e)=> {
          this.messageService.add({summary: 'Ошибка сервера', detail: e.error.message, severity: 'error'})
          return NEVER
        })
      ).subscribe()
    this.subscriptions.push(subscription)
  }
}
