import {Component, OnInit} from '@angular/core';
import {AuthService} from "../common/service/auth.service";
import {NotificationService} from "../common/notification/notification.service";
import {Router} from "@angular/router";
import {catchError, NEVER, tap} from "rxjs";
import {UserT} from "../common/type/base/user.type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    const subscription = this.authService.me().pipe(
      catchError(err => {
        this.notificationService.error('Войдите в систему чтобы продолжить')
        return NEVER
      }),
      tap((user: UserT) => {
        this.notificationService.success('успешно вошли в систему')
      }),
    ).subscribe()
    setTimeout(() => subscription.unsubscribe(), 5000)
    return subscription
  }

  logout() {
    const subscription = this.authService.signOut().pipe(
      tap(() => this.notificationService.success('выход выполнен успешно')),
      tap(() => this.router.navigate(['/auth'])),
      catchError((err) => {
        this.notificationService.error(err.message)
        return NEVER
      }),
    ).subscribe()
    setTimeout(() => subscription.unsubscribe(), 5000)
    return subscription
  }
}
