import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RivalConfigT} from "../../../common/type/base/rival.config.type";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {ProductService} from "../../../common/service/product.service";
import {NotificationService} from "../../../common/notification/notification.service";

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService
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
