import {Component, OnDestroy} from '@angular/core';
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

import {AuthService} from "../../common/service/auth.service";
import {SignInT} from "../../common/type/api/auth/auth.type";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy{
  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
  }
  ngOnDestroy() {
    this.subscriptions$.forEach((e)=> {
      e.unsubscribe()
    })
    this.subscriptions$ = [];
  }
  subscriptions$: Subscription[] = [];

  loginMode = true

  modeChange() {
    this.loginMode = !this.loginMode
  }

  onSignIn(form: NgForm) {
    const subscription = this.authService.signIn(form.value as SignInT).pipe(
      catchError((e) => {
        this.messageService.add({severity: 'error', summary: 'Авторизация', detail: e.error.message})
        return NEVER
      }),
      tap(() => {
        this.getMe()
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
    return subscription
  }

  onSignUp(form: NgForm) {
    const subscription = this.authService.signUp(form.value).pipe(
      catchError((err) => {
        this.messageService.add({severity: 'error', summary: 'Авторизация', detail: err.error.message})
        return NEVER
      }),
      tap((v) => {
        this.messageService.add({severity: 'success', summary: 'Авторизация', detail: 'Аккаунт создан!)'})
        this.messageService.add({severity: 'info', summary: 'Авторизация', detail: 'Зайдите в аккаунт чтобы продолжить*'})
        setTimeout(()=> {this.loginMode = true}, 700)
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
    return subscription
  }

  getMe() {
    const subscription = this.authService.me().pipe(
      catchError((e) => {
        this.messageService.add({severity: 'error', summary: 'Авторизация', detail: e.message})
        return NEVER
      }),
      tap(async (value) => {
        this.messageService.add({severity: 'success', summary: 'Авторизация', detail: 'Вход выполнен успешно 🔥🔥'})
        await this.router.navigate(['/sellers']);
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
    return subscription
  }
}
