import { Component, OnInit, Optional } from '@angular/core';
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

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
})
export class ViewMessageComponent implements OnInit {
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
    private messagingService: MessagingService
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
  onReload() {
    window.location.reload();
  }
  async shareData(image: any) {
    // let node = document.getElementById(index) as HTMLElement;
    // let base64Image: any;
    // await htmlToImage
    //   .toPng(node)
    //   .then(async function (dataUrl) {
    //     console.log(dataUrl);
    //     base64Image = dataUrl;
    //   })
    //   .catch(function (error) {
    //     console.error('oops, something went wrong!', error);
    //   });
    console.log(image);

    let that = this;
    let list = new DataTransfer();
    that
      .urltoFile(image, `${new Date().getMilliseconds()}.png`, 'image/png')
      .then(function (file) {
        console.log(file);
        list.items.add(file);
        that.checkFile(list);
      })
      .catch((err: any) => {
        console.log(err);
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
      }
    });
  }
}
