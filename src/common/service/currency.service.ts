import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {CurrencyResponseApi} from "../type/api/currency/currency.type";

@Injectable()
export class CurrencyService {
  constructor(private readonly httpClient: HttpClient) {}

  get(): Observable<CurrencyResponseApi>{
    return this.httpClient.get<CurrencyResponseApi>('https://users.adata.kz/api/v1/information/currency').pipe(take(1))
  }
}
