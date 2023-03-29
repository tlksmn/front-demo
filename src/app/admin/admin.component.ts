import { Component } from '@angular/core';
import {AdminService} from "../../common/service/admin.service";
import {Observable} from "rxjs";
import {UsersListT} from "../../common/type/api/admin/user.list.type";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private readonly adminService: AdminService) {}

  request$: Observable<UsersListT> = this.adminService.getUserList()
}
