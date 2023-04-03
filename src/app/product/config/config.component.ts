import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PointConfigT} from "../../../common/type/base/point.config.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {ProductService} from "../../../common/service/product.service";
import {NotificationService} from "../../../common/notification/notification.service";

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
    private readonly notificationService: NotificationService
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
          this.notificationService.success('Обновлено ✅')
        }),
        catchError((e)=> {
          this.notificationService.error(e)
          return NEVER
        })
      ).subscribe()
    this.subscriptions.push(subscription)
  }
}
