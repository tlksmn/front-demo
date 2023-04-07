import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, NEVER, Observable, switchMap, tap, timer} from "rxjs";

import {AdminService} from "../../common/service/admin.service";
import {UsersListT} from "../../common/type/api/admin/user.list.type";
import {NotificationService} from "../../common/notification/notification.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  constructor(
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}
  password: string = '';

  async ngOnInit() {
    this.password = window.prompt('admin private key::?')!
    if(this.password.length < 10){
      await this.router.navigate(['sellers'])
    }
  }

  request$: Observable<UsersListT> = timer(500)
    .pipe(
      switchMap(()=> this.adminService.getUserList(this.password)),
      catchError((e)=> {
        this.notificationService.error(e.error.message)
        return NEVER
      }),
      tap(()=> {
        this.notificationService.success('🚀🔥')
      })
    )
}
