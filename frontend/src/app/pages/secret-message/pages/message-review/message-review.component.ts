import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as htmlToImage from 'html-to-image';
import { WebShareService } from 'ng-web-share';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-message-review',
  templateUrl: './message-review.component.html',
  styleUrls: ['./message-review.component.scss'],
})
export class MessageReviewComponent implements OnInit, AfterViewInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  msgSendFlag: boolean = false;
  isButtonDisabled: boolean = false;
  private colors = ['red', 'green', 'yellow', 'blue', 'purple'];

  private fontStyles = [
    'Hachi Maru Pop',
    'Dancing Script',
    'Pacifico',
    'Permanent Marker',
    'Shadows Into Light',
  ];

  base64Image: any = '';
  customFontSize = 30;
  customBackgroundColor: string = 'purple';
  changeDetected: boolean = false;
  isGenarateImage: boolean = false;
  isStyleSelected: boolean = true;
  public uname: any;

  constructor(
    private _generic: GenericService,
    private _dialogRef: MatDialogRef<MessageReviewComponent>,
    private webshareService: WebShareService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (!this.data['from']) {
      if (this.data.msg.length > 50) {
        this.customFontSize = 25;
      }
    } else {
      this.uname = localStorage.getItem('daredisplayName');
    }
  }

  ngAfterViewInit() {
    // this.shareImage('msg');
    // this.genarateImage();
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.changeBackgroundColor();
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
      this.changeFontStyle();
    }
  }

  async genarateImage() {
    this.isStyleSelected = false;
    this.isGenarateImage = true;
    // this.changeDetected = true;
    let node = document.getElementById('msg') as HTMLElement;
    let base64Image: any;
    this.isButtonDisabled = true;
    // this.isGenarateImage = false;
    await htmlToImage
      .toPng(node, {
        width: 720,
        height: 1080,
        pixelRatio: 1,
        style: {
          display: 'flex',
          alignItems: 'center',
          placeContent: 'center',
          color: '#fff',
        },
      })
      .then(async function (dataUrl) {
        console.log(dataUrl);
        base64Image = dataUrl;
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    this.isGenarateImage = false;
    // this.changeDetected = false;
    this.base64Image = base64Image;
  }
  shareImage() {
    this.genarateImage();
    let that = this;
    let list = new DataTransfer();
    that
      .urltoFile(
        this.base64Image,
        `${new Date().getMilliseconds()}.png`,
        'image/png'
      )
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
      this._dialogRef.close();
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
        this._dialogRef.close();
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
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.colors.length)
    );
    let elem: any;
    elem = document.getElementById('msg') as HTMLElement;
    // elem.style.backgroundColor = this.colors[randomIndex];
    this.customBackgroundColor = this.colors[randomIndex];
    // setTimeout(() => {
    //   this.changeDetected = true;
    //   this.genarateImage();
    // }, 1500);
  }

  changeFontStyle() {
    // let elem = document.getElementById('msg') as HTMLElement;
    // elem.style.pointerEvents = 'none';
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.fontStyles.length)
    );
    let textElem: any;
    textElem = document.getElementById('text') as HTMLElement;
    textElem.style.fontFamily = this.fontStyles[randomIndex];
    // setTimeout(() => {
    //   this.changeDetected = true;
    //   this.genarateImage();
    // }, 1500);
  }
}
