import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  public apiURL = environment.secretbaseurl;
  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
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
  siteMap(type: string = '', data: any = {}) {
    let nodeUrl = '';
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.origin.includes('http://localhost:')) {
        nodeUrl = 'http://localhost:5000/';
      } else {
        nodeUrl = environment.hostingurl;
      }
    }
    if (type == 'get') {
      return this._http.get(nodeUrl + 'get-sitemap/');
    } else {
      return this._http.post(nodeUrl + 'createxmlsitemap/', data);
    }
  }
}
