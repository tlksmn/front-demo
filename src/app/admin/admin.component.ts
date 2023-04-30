import {Component, OnInit} from '@angular/core';
import {catchError, NEVER, Observable, switchMap, tap, timer} from "rxjs";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

import {AdminService} from "../../common/service/admin.service";
import {UsersListT} from "../../common/type/api/admin/user.list.type";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  constructor(
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly messageService: MessageService
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
        this.messageService.add({severity:'error', summary: 'ошибка', detail: e.error.message})
        return NEVER
      }),
      tap(()=> {
        this.messageService.add({severity:'success', summary: 'Админ', detail: '🚀🔥'})
      })
    )
}
