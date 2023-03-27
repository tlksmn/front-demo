import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
    return this.authService.status.pipe(
      tap(async (value) => {
        if (!value) {
          await this.router.navigate(['/auth'])
        }
      })
    )
  }
}
