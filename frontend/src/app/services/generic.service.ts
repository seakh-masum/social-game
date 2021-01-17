import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(
    private _http: HttpClient, 
  ) { }

  get(url: string) {
    return this._http.get(url);
  }

  getWithParams(url: string, params: HttpParams) {
    return this._http.get(url, {params: params});
  }

  post(url: string, data: any) {
    return this._http.post(url, data);
  }

  delete(url: string, data: any) {
    return this._http.delete(url, data);
  }

  put(url: string, data: any) {
    return this._http.put(url, data);
  }
}
