import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
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
  public dynamicMeta: any = '';

  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    _route.params.pipe(map((p) => p.id)).subscribe((res: any) => {
      if (res) {
        this._global.userId = res;
        try {
          this.dynamicMeta = `#❤️Hey 🙈 message to 🤟${atob(
            res
          )}🤟,😬😬 don't worry ${atob(res)} will not know your name😉❤️#`;
        } catch (err) {
          this.dynamicMeta = `#❤️Hey 🙈 message to 🤟${Buffer.from(
            res,
            'base64'
          ).toString('binary')}🤟,😬😬 don't worry ${Buffer.from(
            res,
            'base64'
          ).toString('binary')} will not know your name😉❤️#`;
        }
        // title.setTitle('Send Message');
        // if (isPlatformBrowser(this.platformId)) {
        //   this.meta.addTags([
        //     {
        //       name: 'title',
        //       content: `Send Message`,
        //     },
        //     {
        //       property: 'og:title',
        //       content: `Send Message`,
        //     },
        //     {
        //       property: 'twitter:title',
        //       content: `Send Message`,
        //     },
        //     {
        //       name: 'description',
        //       content: `#❤️Hey 🙈 message to 🤟${atob(
        //         res
        //       )}🤟,😬😬 don't worry ${atob(res)} will not know your name😉❤️#`,
        //     },
        //     {
        //       name: 'author',
        //       content: `Sayon Chakraborty / Sk Masum`,
        //     },
        //     {
        //       property: 'og:description',
        //       content: `#❤️Hey 🙈 message to 🤟${atob(
        //         res
        //       )}🤟,😬😬 don't worry ${atob(res)} will not know your name😉❤️#`,
        //     },
        //     {
        //       property: 'og:url',
        //       content: `https://socail-game.web.app/secret-message/sent/${res}`,
        //     },
        //     {
        //       property: 'twitter:description',
        //       content: `#❤️Hey 🙈 message to 🤟${atob(
        //         res
        //       )}🤟,😬😬 don't worry ${atob(res)} will not know your name😉❤️#`,
        //     },
        //     {
        //       property: 'twitter:url',
        //       content: `https://socail-game.web.app/secret-message/sent/${res}`,
        //     },
        //   ]);
        // }
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
    let url: any;
    try {
      url = 'user-details/' + atob(this._global.userId);
    } catch (err) {
      url =
        'user-details/' +
        Buffer.from(this._global.userId, 'base64').toString('binary');
    }
    console.log(url);
    this._generic.get(url).subscribe((res: any) => {
      console.log(res);
      if (res['Status']) {
        if (res['Data']) {
          localStorage.setItem('token', res.Data[0].token);
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
            this._dialog.open(SuccessDialogComponent)
              .afterClosed().subscribe((res: any)=> {
                if(res.status) {
                  this._router.navigate(['secret-message/create']);
                }
            })
          } else {
            this._global.openSnackbar(res.Message, 'error');
          }
        },
        (err) => {
          this._global.openSnackbar(err.Message, 'Error');
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
