import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  public apiURL = environment.secretbaseurl;
  public headerSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public loginState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private _http: HttpClient, private _router: Router) {}
  isLogin() {
    var date1 = new Date(localStorage.getItem('LoginTime'));
    var date2 = new Date();

    var diff = date2.getTime() - date1.getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    if (
      localStorage.getItem('LoginTime') &&
      new Date(localStorage.getItem('LoginTime')).getDay() ===
        new Date().getDay() &&
      new Date(localStorage.getItem('LoginTime')).getFullYear() ===
        new Date().getFullYear() &&
      hh < 8
    ) {
      console.log('********* 8hrs Not Gone **********');
      this.loginState.next(true);
      return true;
    } else {
      console.log('********* 8hrs Gone **********');
      this.loginState.next(false);
      return false;
    }
  }
  get(url: string, params = '', currentPage = '1', pagelimit = '10') {
    if (params && params === 'currentPage') {
      let params = new HttpParams();
      params = params.append('currentpage', currentPage);
      params = params.append('pagelimit', pagelimit);
      return this._http.get(this.apiURL + url, { params: params });
    } else if (params && params != 'currentPage') {
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

  delete(url: string, data: any, type: any) {
    console.log(data);
    return this._http.delete(this.apiURL + url + data + '/' + type);
  }

  put(url: string, data: any) {
    return this._http.put(this.apiURL + url, data);
  }
}
