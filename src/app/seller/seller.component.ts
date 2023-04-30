import {BehaviorSubject, catchError, NEVER, Observable, Subscription, tap} from "rxjs";
import {Component, OnDestroy} from '@angular/core';
import {MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";

import {SellerService} from "../../common/service/seller.service";
import {SellerResponseApiT} from "../../common/type/api/seller/seller.type";
import {AuthService} from "../../common/service/auth.service";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnDestroy {
  constructor(
    private readonly sellerService: SellerService,
    readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => {
      e.unsubscribe()
    })
    this.subscriptions = []
  }

  private subscriptions: Subscription[] = []
  request$: Observable<SellerResponseApiT> = this.sellerService.getList()
  addModeStream: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  changeMode(value: boolean) {
    this.addModeStream.next(value);
  }

  addSeller(form: NgForm) {
    const subscription = this.sellerService.addSeller(form.value).pipe(
      tap((value) => {
        this.messageService.add({severity: 'success', summary: 'Добавление магазина', detail: 'Успешно добавлено.'})
        this.messageService.add({
          severity: 'warn',
          summary: 'Добавление магазина',
          detail: 'Подождите 1-2 минуты. \nВсе зависит от количества товаров и точек продаж.'
        })
      }),
      catchError((e) => {
        this.messageService.add({severity: 'error', summary: 'Добавление магазина', detail: e.error.message})
        if (e.error.statusCode !== 406)
          this.messageService.add({
            severity: 'error',
            summary: 'Авторизация',
            detail: 'Неправильный пароль или логин. Повторите позже'
          })
        else if (e.error.statusCode !== 404)
          this.messageService.add({
            severity: 'error',
            summary: 'Авторизация',
            detail: 'Такой магазин уже добавлен ранее, пожалуйста обратитесь к администратору'
          })
        return NEVER
      })
    ).subscribe()
    this.subscriptions.push(subscription)
  }

  async copyClipboard(text: string) {
    await window.navigator.clipboard.writeText(text);
    this.messageService.add({severity: 'success', summary: 'Буфер обмена', detail: 'Скопировано в буфер 🔥🚀'})
  }
}
