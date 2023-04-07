import {Injectable} from "@angular/core";
import {UsersListT} from "../type/api/admin/user.list.type";
import {UpdateUserT} from "../type/api/admin/update.user.type";
import {UserT} from "../type/base/user.type";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class AdminService{
  constructor(private readonly httpClient: HttpClient) {}
  private readonly adminUrl: string = environment.adminUrl;

  getUserList(password: string){
    return this.httpClient.get<UsersListT>(this.adminUrl+ 'list', {
      params: {
        pass: password
      }
    }).pipe(take(1))
  }

  updateUser(data: UpdateUserT, password: string){
    return this.httpClient.post<UserT>(this.adminUrl+'update', {...data, pass: password}, {})
      .pipe(take(1))
  }
}
