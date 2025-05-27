import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {
  private API_URL_BASE = "https://api.coingecko.com/api/v3/coins/"
  private API_URL_MARKET = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=30"
  http = inject(HttpClient)

  constructor() { }

  getCryptos() {
    return this.http.get(this.API_URL_MARKET)
    .pipe(
      map((res : any) => {
        return res
      })
    )
  }

  getHistoryOHCL(cryptoId: any) {
    return this.http.get(`${this.API_URL_BASE}/${cryptoId}/ohlc?vs_currency=usd&days=365`)
    .pipe(
      map((res : any) => {
        return res
      })
    )
  }

  getCryptoDetails(cryptoId: any) {
    return this.http.get(`${this.API_URL_BASE}/${cryptoId}/?vs_currency=usd`)
    .pipe(
      map((res : any) => {
        return res
      })
    )
  }
}
