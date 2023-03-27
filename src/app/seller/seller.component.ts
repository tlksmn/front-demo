import {BehaviorSubject, catchError, NEVER, Observable, tap} from "rxjs";
import {Component} from '@angular/core';
import {SellerService} from "../../common/service/seller.service";
import {SellerResponseApiT} from "../../common/type/api/seller/seller.type";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../common/notification/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {
  constructor(
    private readonly sellerService: SellerService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  request$: Observable<SellerResponseApiT> = this.sellerService.getList()
  addModeStream: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  changeMode(value: boolean) {
    this.addModeStream.next(value);
  }

  addSeller(form: NgForm) {
    //-todo unsubscribe
    return this.sellerService.addSeller(form.value).pipe(
      tap((value) => this.notificationService.success('Подождите идёт инициализация')),
      catchError((e) => {
        this.notificationService.error('Неправильный пароль или логин. Повторите позже');
        return NEVER
      })
    ).subscribe()
  }

  async switchToSeller(id: number) {
    await this.router.navigate(['seller', id, 'products'])
    return;
  }
}
