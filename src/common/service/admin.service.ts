import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {UsersListT} from "../type/api/admin/user.list.type";
import {UpdateUserT} from "../type/api/admin/update.user.type";
import {UserT} from "../type/base/user.type";

@Injectable()
export class AdminService{
  constructor(private readonly apiService: ApiService) {}

  getUserList(){
    return this.apiService.get<UsersListT>('admin/user/list', {})
  }

  updateUser(data: UpdateUserT){
    return this.apiService.post<UserT, UpdateUserT>('admin/update', data, {})
  }
}
