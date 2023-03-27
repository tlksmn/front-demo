import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiService{
  private readonly apiUrl = environment.apiUrl
  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string, options: any) {
    return this.httpClient.get<T>(this.apiUrl + url, {...options, withCredentials: true})
      .pipe(
        take(1)
      ) as Observable<T>
  }

  post<T, B>(url: string, body: B, options: any) {
    return this.httpClient.post<T>(this.apiUrl + url, body, {...options, withCredentials: true})
      .pipe(
        take(1)
      ) as Observable<T>
  }
}
