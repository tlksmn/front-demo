import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserT} from "../../../common/type/base/user.type";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../common/service/auth.service";
import {AdminService} from "../../../common/service/admin.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-id-admin',
  templateUrl: './id-admin.component.html',
  styleUrls: ['./id-admin.component.scss']
})
export class IdAdminComponent implements OnInit, OnDestroy {
  @Input('user') user!: UserT;
  userForm!: FormGroup;
  subscriptions: Subscription[] = [];
  edited: boolean = false;
  openSellers: boolean = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly adminService: AdminService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      activated: new FormControl(this.user.activated)
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
    const subscription = this.adminService.updateUser({...this.userForm.value, id: this.user.id})
      .pipe(
        tap((v) => {
          Object.assign(this.user, v)
          this.edited = false;
        })
      ).subscribe()
    this.subscriptions.push(subscription)
  }
  changeSellerMode(){
    this.openSellers = !this.openSellers
  }
}
