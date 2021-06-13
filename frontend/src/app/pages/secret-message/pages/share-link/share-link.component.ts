import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { WebShareService } from 'ng-web-share';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { PageMetadata } from 'src/app/services/meta-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss'],
})
export class ShareLinkComponent implements OnInit {
  url: string = '';
  wapUrl: SafeUrl = '';
  fbUrl: string = '';
  userMeta: any = '';
  location: any;
  shareImgUrl: any =
    'https://res.cloudinary.com/dzruu87x0/image/upload/v1612097153/secret-message_buzlnc.gif';
  // fileList = new DataTransfer();
  fileList :any;
  defaultMetadata: PageMetadata = {
    title: 'Secret Message',
    description: `Send secret message to the user, they don't know who send him`,
    author: 'Sayon Chakraborty / Sk Masum',
    keywords: ['Annoymous', 'messages', 'Annoymous messages', 'Secret Message'],
    type: 'website',
  };
  iconList: Array<any> = [];

  sharingOptions: {
    name: string;
    icon: string;
    color: string;
    href: SafeUrl;
  }[] = [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _nativeShare: NgNavigatorShareService,
    private webshareService: WebShareService,
    private sanitizer: DomSanitizer,
    private _global: GlobalService,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.location = window.location.href;
    _route.params.pipe(map((p) => p.id)).subscribe((res) => {
      if (res) {
        _global.userId = res;
        if (isPlatformBrowser(this.platformId)) {
          let encrptedUser = localStorage.getItem('encyptduser');
          if (
            encrptedUser !== undefined &&
            atob(String(encrptedUser)) == atob(res)
          ) {
            // this.getMessageDetails();
            _global.watchPosition();
            _global.getSiteMapGenerate(window.location.href,'Secret-Messages');
            // this.updateMetaTag();
            this.userMeta = `#❤️Hey 🙈 message to 🤟${atob(
              res
            )}🤟,😬😬 don't worry ${atob(res)} will not know your name😉❤️#`;
          } else {
            this._router.navigate(['/secret-message/sent/' + _global.userId]);
          }
        }
      } else {
        this._router.navigate(['/secret-message/create']);
      }
    });

    // metadata.generateMetaDefinitions(this.defaultMetadata);
  }

  ngOnInit(): void {
    this.url = environment.hostingurl + localStorage.getItem('link');
    this.fbUrl = 'http://www.facebook.com/sharer.php?u=' + this.url;
    this.wapUrl = this.sanitizeUrl('whatsapp://send?text=' + this.url);
    if(isPlatformBrowser(this.platformId)){
      this.fileList = new DataTransfer();
      let that = this;
      that
        .urltoFile(
          this.shareImgUrl,
          `${new Date().getMilliseconds()}.gif`,
          'image/gif'
        )
        .then(function (file) {
          console.log(file);
          that.fileList.items.add(file);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    this.sharingOptions = [
      {
        name: 'Share to Device',
        icon: 'facebook.svg',
        color: '#gt6789',
        href: this.fbUrl,
      },
      {
        name: 'Whatsapp Status',
        icon: 'whatsapp.svg',
        color: '#25D366',
        href: this.wapUrl,
      },
      {
        name: 'Facebook Status',
        icon: 'facebook.svg',
        color: '#3B5998',
        href: this.fbUrl,
      },
    ];
  }
  async urltoFile(url: any, filename: any, mimeType: any) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  updateMetaTag() {
    const imgUrl =
      'https://res.cloudinary.com/dzruu87x0/image/upload/v1612033640/secret-message_lgicit.png';
    this.meta.updateTag({
      name: 'description',
      content: `#❤️Hey 🙈 message to 🤟${localStorage.getItem(
        'displayName'
      )}🤟,😬😬 don't worry ${localStorage.getItem(
        'displayName'
      )} will not know your name😉❤️#`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: imgUrl,
      itemprop: 'image',
    });
    this.meta.updateTag({
      property: 'og:image:url',
      content: imgUrl,
      itemprop: 'image',
    });
    this.meta.updateTag({
      property: 'og:image:type',
      content: 'image/png',
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  urlCopied() {
    this._global.openSnackbar('Copied', 'Success');
  }
  async sendToDevice(url: string) {
    let list: any = this.fileList.files;
    if (!this.webshareService.canShareFile(list)) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
    await this.webshareService
      .share({
        title: 'Secret Message',
        text: `#❤️Hey 🙈 message to 🤟${localStorage.getItem(
          'displayName'
        )}🤟,😬😬 don't worry ${localStorage.getItem(
          'displayName'
        )} will not know your name😉❤️#`,
        url: url,
        files: list,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
