import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, Subject } from 'rxjs';
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

  constructor(
    private _snackbar: MatSnackBar,
    private _generic: GenericService,
    public deviceService: DeviceDetectorService
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
      duration: 3000,
    });
  }
  watchPosition() {
    this.longitude = '';
    this.latitude = '';
    navigator.geolocation.watchPosition(
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
      },
      (err) => {
        console.log(err);
        if (!navigator.geolocation) {
          console.log('location is not set');
        } else {
          navigator.geolocation.getCurrentPosition(async (position: any) => {
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
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
    );
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
}
