import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  public apiURL = environment.secretbaseurl;
  constructor(private _http: HttpClient) {
    console.log(environment.production);
  }

  get(url: string, params = '') {
    if (params) {
      return this._http.get(this.apiURL + url + params);
    }
    return this._http.get(this.apiURL + url);
  }

  getip(url: string) {
    return this._http.get(url);
  }

  post(url: string, data: any) {
    return this._http.post(this.apiURL + url, data);
  }

  delete(url: string, data: any) {
    return this._http.delete(this.apiURL + url, data);
  }

  put(url: string, data: any) {
    return this._http.put(this.apiURL + url, data);
  }
}
