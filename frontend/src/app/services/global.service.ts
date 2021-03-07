import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isArray } from 'util';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public userId: any = '';
  public longitude: any = '';
  public latitude: any = '';
  public deviceInfo: any = null;
  public ipAddress: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public headerSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public sitemapArray: any[] = [];

  constructor(
    private _snackbar: MatSnackBar,
    private _generic: GenericService,
    public deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    _generic.getip('https://jsonip.com').subscribe((res: any) => {
      console.log(res);
      this.ipAddress.next(res['ip']);
      localStorage;
    });
  }

  openSnackbar(msg: string, type: string) {
    this._snackbar.open(msg, 'X', {
      panelClass: [type],
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  watchPosition() {
    this.longitude = '';
    this.latitude = '';
    if (isPlatformBrowser(this.platformId)) {
      try {
        navigator.geolocation.watchPosition(
          async (position: any) => {
            // console.log(
            //   `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
            // );
            if (
              position.coords.longitude != '' &&
              position.coords.latitude != '' &&
              this.longitude != position.coords.longitude &&
              this.latitude != position.coords.latitude
            ) {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              if (localStorage.getItem('id') != undefined) {
                let params = {
                  _id: localStorage.getItem('id'),
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude,
                };
                this._generic
                  .post('update-details', params)
                  .subscribe((res: any) => {
                    // console.log(res);
                  });
              }
            }
          },
          (err) => {
            console.log(err);
            if (!navigator.geolocation) {
              console.log('location is not set');
            } else {
              navigator.geolocation.getCurrentPosition(
                async (position: any) => {
                  console.log(
                    `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
                  );
                  if (
                    position.coords.longitude != '' &&
                    position.coords.latitude != '' &&
                    this.longitude != position.coords.longitude &&
                    this.latitude != position.coords.latitude
                  ) {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    if (localStorage.getItem('id') != undefined) {
                      let params = {
                        _id: localStorage.getItem('id'),
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                      };
                      this._generic
                        .post('update-details', params)
                        .subscribe((res: any) => {
                          console.log(res);
                        });
                    }
                  }
                }
              );
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0,
          }
        );
      } catch (err) {
        console.warn(err);
      }
    }
  }
  deviceDetection() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    if (
      typeof this.deviceInfo != 'undefined' &&
      localStorage.getItem('id') != undefined
    ) {
      this.ipAddress.subscribe((res) => {
        let params = {
          userid: localStorage.getItem('id'),
          msgid: '',
          browser: this.deviceInfo['browser'],
          browser_version: this.deviceInfo['browser_version'],
          device: this.deviceInfo['device'],
          deviceType: this.deviceInfo['deviceType'],
          orientation: this.deviceInfo['orientation'],
          os: this.deviceInfo['os'],
          os_version: this.deviceInfo['os_version'],
          userAgent: this.deviceInfo['userAgent'],
          ip: res,
        };
        this._generic
          .post('save-device-info', params)
          .subscribe((res: any) => {});
      });
    }
  }
  getSiteMapGenerate(url: any, sitemapfor: String) {
    this.sitemapArray = [];
    this._generic.siteMap('get').subscribe((data: any) => {
      // console.log(data);
      if (
        data['Status'] &&
        data['fileContent'] &&
        data['fileContent']['urlset'] &&
        data['fileContent']['urlset']['url'] &&
        data['fileContent']['urlset']['url'].length > 0
      ) {
        if (
          Array.isArray(data['fileContent']['urlset']['url']) &&
          data['fileContent']['urlset']['url'].length > 1
        ) {
          if (
            data['fileContent']['urlset']['url'].findIndex(
              (x) => x.loc === url
            ) === -1
          ) {
            data['fileContent']['urlset']['url'].forEach((x: any) => {
              if (x == environment.hostingurl + 'secret-message/create') {
                this.sitemapArray.push({
                  loc: x.loc,
                  changefreq: x.changefreq,
                  priority: x.priority,
                });
              } else {
                this.sitemapArray.push({
                  loc: x.loc,
                  changefreq: x.changefreq,
                  priority: x.priority,
                });
              }
            });
            this.sitemapArray.push({
              loc: url,
              changefreq: 'monthly',
              priority: 0.8,
            });
            this.generateSiteMap(this.sitemapArray, sitemapfor);
          } else {
            console.log('######### Sitemap has Already Created #########');
          }
        } else {
          if (data['fileContent']['urlset']['url'] != url) {
            if (
              data['fileContent']['urlset']['url'] ==
              environment.hostingurl + 'secret-message/create'
            ) {
              this.sitemapArray.push({
                loc: data['fileContent']['urlset']['url'],
                changefreq: 'yearly',
                priority: 1,
              });
            } else {
              this.sitemapArray.push({
                loc: data['fileContent']['urlset']['url'],
                changefreq: 'monthly',
                priority: 0.8,
              });
            }
            this.sitemapArray.push({
              loc: url,
              changefreq: 'monthly',
              priority: 0.8,
            });
            this.generateSiteMap(this.sitemapArray, sitemapfor);
          } else {
            console.log('######### Sitemap has Already Created #######');
          }
        }
      } else {
        this.sitemapArray.push({
          loc: environment.hostingurl + 'secret-message/create',
          changefreq: 'yearly',
          priority: 1,
        });
        this.sitemapArray.push({
          loc: url,
          changefreq: 'monthly',
          priority: 0.8,
        });
        this.generateSiteMap(this.sitemapArray, sitemapfor);
      }
    });
  }
  generateSiteMap(url: any, sitemapfor: String) {
    let param = {
      xml: {
        urlset: {
          $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
          url: url,
        },
      },
      file_name: 'sitemap.xml',
    };
    this._generic.siteMap('', param).subscribe((data: any) => {
      // console.log(data);
      if (data['Status']) {
        let req = {
          sitemapfor: sitemapfor,
          sitemap: param['xml']['urlset']['url'],
          filename: param['file_name'],
          store1: data['Path'],
          store2: data['Path2'],
        };
        this._generic.post('save-sitemap-details', req).subscribe((res) => {});
      }
    });
  }
}
