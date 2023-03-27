import {Component, OnDestroy} from '@angular/core';
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {NotificationService} from "../../common/notification/notification.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
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
    private readonly notificationService: NotificationService,
    private readonly router: Router
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
        this.notificationService.error(e.error.message)
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
        this.notificationService.error(err.error.message)
        return NEVER
      }),
      tap((v) => {
        this.notificationService.success('user created!')
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
    return subscription
  }

  getMe() {
    const subscription = this.authService.me().pipe(
      catchError((e) => {
        this.notificationService.error(e.message)
        return NEVER
      }),
      tap(async (value) => {
        this.notificationService.success(`Вход выполнен успешно`);
        await this.router.navigate(['/sellers']);
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
    return subscription
  }
}
