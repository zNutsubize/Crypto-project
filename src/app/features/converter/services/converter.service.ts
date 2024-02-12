import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor(private http: HttpClient) {}

  public currencyUrl: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&sparkline=false`;

  public getCurrency(): Observable<Object[]> {
    return this.http.get(this.currencyUrl) as Observable<Object[]>;
  }

  public getRate(currency: string): Observable<Object[]> {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`
    ) as Observable<Object[]>;
  }
}
