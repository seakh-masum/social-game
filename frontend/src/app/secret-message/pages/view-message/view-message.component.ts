import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Optional,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { MetadataService } from 'src/app/services/meta-data.service';
import * as htmlToImage from 'html-to-image';
import { WebShareService } from 'ng-web-share';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { MessagingService } from 'src/app/services/messaging.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageReviewComponent } from '../message-review/message-review.component';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
})
export class ViewMessageComponent implements OnInit, AfterViewInit {
  messages: Array<any> = [];
  messageData: any = '';

  constructor(
    private _route: ActivatedRoute,
    private _generic: GenericService,
    private _router: Router,
    private _global: GlobalService,
    @Optional() private metadataService: MetadataService,
    private meta: Meta,
    private title: Title,
    private webshareService: WebShareService,
    private messagingService: MessagingService,
    private _dialog: MatDialog
  ) {
    _route.params.pipe(map((p) => p.id)).subscribe((res) => {
      if (res) {
        _global.userId = res;
        let encrptedUser = localStorage.getItem('encyptduser');
        console.log(atob(String(encrptedUser)), atob(res));
        if (encrptedUser && atob(String(encrptedUser)) == atob(res)) {
          this.getMessageDetails();
        } else {
          this._router.navigate(['/secret-message/sent/' + _global.userId]);
        }
      } else {
        this._router.navigate(['/secret-message/create']);
      }
    });
  }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }

  ngAfterViewInit(): void {}

  onReload() {
    window.location.reload();
  }
  async shareData(message: any) {
    this._dialog
      .open(MessageReviewComponent, {
        data: {
          msg: message,
        },
        panelClass: ['preview-msg']
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }
  async checkFile(event: any) {
    if (!this.webshareService.canShareFile(event.files)) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
    await this.webshareService
      .share({
        title: 'Secret Message',
        text: 'hey create your link like me,then click here',
        url: 'https://socail-game.web.app/',
        files: event.files,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  urltoFile(url: any, filename: any, mimeType: any) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  getMessageDetails() {
    const url = 'message-details/' + localStorage.getItem('id');
    this._generic.get(url).subscribe((res: any) => {
      console.log(res);
      if (res['Status']) {
        this.messages = res.Data[0].messagedetails;
        this.messages = this.messages.reverse();
      }
    });
  }
  // createCanvas(i: any) {
  //   let c = document.getElementById(i) as HTMLCanvasElement;
  //   let ctx: any;
  //   ctx = c.getContext('2d');
  //   ctx.font = "30px Arial";
  //   ctx.fillText('Hello World');
  // }
}
