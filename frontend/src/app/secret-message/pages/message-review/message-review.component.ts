import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as htmlToImage from 'html-to-image';
import { WebShareService } from 'ng-web-share';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-message-review',
  templateUrl: './message-review.component.html',
  styleUrls: ['./message-review.component.scss']
})
export class MessageReviewComponent implements OnInit, AfterViewInit {

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  msgSendFlag: boolean= false;
  isButtonDisabled: boolean = false;
  private colors = [
    'red',
    'green',
    'yellow',
    'blue'
  ];

  private fontStyles = [
    'Hachi Maru Pop', 'Dancing Script', 'Pacifico', 'Permanent Marker', 'Shadows Into Light'
  ];

  customFontSize = 30;
  base64Image: any = '';
  
  constructor(
    private _generic: GenericService,
    private _dialogRef: MatDialogRef<MessageReviewComponent>,
    private webshareService: WebShareService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if(this.data.msg.length>30) {
      this.customFontSize = 20;
    }
  }
  
  ngAfterViewInit() {
    // this.shareImage('msg');
    this.genarateImage();
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    // out of range
    // if (currentIndex > this.avatars.length || currentIndex < 0) return;

    // let nextIndex = 0;

    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
        // const isLast = currentIndex === this.colors.length - 1;
        // nextIndex = isLast ? 0 : currentIndex + 1;
        this.changeBackgroundColor();
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
        // const isFirst = currentIndex === 0;
        // nextIndex = isFirst ? this.fontStyles.length - 1 : currentIndex - 1;
        this.changeFontStyle();
    }

    // toggle avatar visibility
    // this.avatars.forEach((x, i) => x.visible = (i === nextIndex));
  }

  async genarateImage() {
    let node = document.getElementById('msg') as HTMLElement;
    let base64Image: any;
    this.isButtonDisabled = true;
    await htmlToImage
      .toPng(node)
      .then(async function (dataUrl) {
        console.log(dataUrl);
        base64Image = dataUrl;
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    this.isButtonDisabled = false;
    this.base64Image = base64Image;
  }
  async shareImage(id: any) {
    this.genarateImage();
    let that = this;
    let list = new DataTransfer();
    that
      .urltoFile(this.base64Image, `${new Date().getMilliseconds()}.png`, 'image/png')
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

  changeBackgroundColor() {
    const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    let elem: any;
    elem = document.getElementById('msg') as HTMLElement;
    elem.style.backgroundColor = this.colors[randomIndex];
  }

  changeFontStyle() {
    // let elem = document.getElementById('msg') as HTMLElement;
    // elem.style.pointerEvents = 'none';
    const randomIndex = Math.floor(Math.random() * Math.floor(this.fontStyles.length));
    let textElem: any;
    textElem = document.getElementById('text') as HTMLElement;
    textElem.style.fontFamily = this.fontStyles[randomIndex];
  }

  // sendMessage() {
  //    this._generic.post('savemessages', this.data.params).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         if (res['Status']) {
  //           // this.msg = '';
  //           this.msgSendFlag = true;
  //           this._dialogRef.close({msgSendFlag: this.msgSendFlag});
  //           // this._global.openSnackbar(res.Message, 'success');
  //           // this._dialog.open(DialogComponent);
  //         } else {
  //           // this._global.openSnackbar(res.Message, 'error');
  //         }
  //       },
  //       (err) => {
  //         // this._global.openSnackbar(err.Message, 'success');
  //       }
  //     );
  // }
  
}
