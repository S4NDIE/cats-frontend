import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioBaseService<T> {
  constructor(private _http: HttpClient) {}

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private setHeaders(hasAuth: boolean): HttpHeaders {
    let headers = new HttpHeaders();

    if (hasAuth) {
      headers = headers.set('Authorization', this.getUserToken());
    }

    return headers;
  }

  getUserToken(): string {
    const token = this.getItem(environment.tokenName);

    return token ? `Bearer ${token}` : '';
  }

  get(url: string, hasAuth: boolean): Observable<T> {
    return this._http.get<T>(url, {
      headers: this.setHeaders(hasAuth),
    });
  }

  post(url: string, body: any, hasAuth: boolean): Observable<T> {
    return this._http.post<T>(url, body, { headers: this.setHeaders(hasAuth) });
  }

  put(url: string, body: any, hasAuth: boolean): Observable<T> {
    return this._http.put<T>(url, body, { headers: this.setHeaders(hasAuth) });
  }

  delete(url: string, hasAuth: boolean): Observable<T> {
    return this._http.delete<T>(url, { headers: this.setHeaders(hasAuth) });
  }
  options(url: string, hasAuth: boolean): Observable<T> {
    return this._http.options<T>(url, { headers: this.setHeaders(hasAuth) });
  }
}
