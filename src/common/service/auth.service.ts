import {Injectable} from "@angular/core";
import {UserT} from "../type/base/user.type";
import {catchError, ReplaySubject, Subject, tap, throwError} from "rxjs";
import {ApiService} from "./api.service";
import {LogoutMessageT, SignInT, SignUpT} from "../type/api/auth/auth.type";

@Injectable()
export class AuthService{
  status: Subject<boolean> = new ReplaySubject(1)
  user: Partial<UserT> = {}

  constructor(private readonly apiService: ApiService) {
  }


  me() {
    return this.apiService.get<UserT>('auth/me', null).pipe(
      tap((e)=> {
        this.user = e;
        this.status.next(true)
      }),
      catchError((e) => {
        this.user={}
        this.status.next(false)
        return throwError(e.error)
      })
    )
  }

  signIn(data: SignInT) {
    return this.apiService.post<UserT, SignInT>('auth/sign-in', data, null).pipe(
      tap((user) => {
          this.user = user;
          this.status.next(true);
        }
      ),
    )
  }

  signUp(data: SignUpT) {
    return this.apiService.post<UserT, SignUpT>('auth/sign-up', data, null)
  }

  signOut() {
    return this.apiService.get<LogoutMessageT>('auth/sign-out', null).pipe(
      tap(() => {
        this.user = {}
        this.status.next(false)
      })
    )
  }
}
