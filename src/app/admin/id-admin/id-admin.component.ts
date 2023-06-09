import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserT} from "../../../common/type/base/user.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../../../common/service/admin.service";
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-id-admin',
  templateUrl: './id-admin.component.html',
  styleUrls: ['./id-admin.component.scss']
})
export class IdAdminComponent implements OnInit, OnDestroy {
  @Input('user') user!: UserT;
  @Input('password') password: string = ''
  userForm!: FormGroup;
  subscriptions: Subscription[] = [];
  edited: boolean = false;
  openSellers: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly adminService: AdminService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      activated: new FormControl(this.user.activated),
      accessed: new FormControl(this.user.accessed)
    })
    const subscription = this.userForm.valueChanges.pipe(
      tap(() => {
        this.edited = true
      })
    ).subscribe()
    this.subscriptions.push(subscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => {
      e.unsubscribe()
    })
    this.subscriptions = []
  }

  onSubmit() {
    const subscription = this.adminService.updateUser({...this.userForm.value, id: this.user.id}, this.password)
      .pipe(
        tap((v) => {
          Object.assign(this.user, v)
          this.edited = false;
        })
      ).subscribe()
    this.subscriptions.push(subscription)
  }

  changeSellerMode() {
    this.openSellers = !this.openSellers
  }

  deleteUser() {
    if (confirm('вы хотите удалить ' + this.user.name + '? ')) {
      const subscription = this.adminService.deleteSeller({id: this.user.id}, this.password)
        .pipe(
          tap((res) => {
            this.messageService.add({severity: 'success', detail: res.message})
          }),
          catchError((e) => {
            this.messageService.add({severity: 'error', detail: e.error.message})
            return NEVER
          })
        ).subscribe()
      this.subscriptions.push(subscription);
    }
  }
}
