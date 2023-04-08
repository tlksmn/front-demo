import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, NEVER, tap} from "rxjs";
import {MessageService} from "primeng/api";

import {UserT} from "../common/type/base/user.type";
import {AuthService} from "../common/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit() {
    const subscription = this.authService.me().pipe(
      catchError(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Авторизация',
          detail: 'Войдите в систему чтобы продолжить'
        })
        return NEVER
      }),
      tap((user: UserT) => {
        this.messageService.add({severity: 'success', summary: 'Авторизация', detail: 'Успешно вошли в систему'})
      }),
    ).subscribe()
    setTimeout(() => subscription.unsubscribe(), 5000)
    return subscription
  }

  logout() {
    const subscription = this.authService.signOut().pipe(
      tap(() => {
        this.messageService.add({severity: 'success', summary: 'Авторизация', detail: 'Выход выполнен успешно'})
      }),
      tap(() => this.router.navigate(['/auth'])),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Авторизация',
          detail: err.message
        })
        return NEVER
      }),
    ).subscribe()
    setTimeout(() => subscription.unsubscribe(), 5000)
    return subscription
  }
}
