import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeUrl, Title } from '@angular/platform-browser';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { GlobalService } from 'src/app/services/global.service';
import { PageMetadata } from 'src/app/services/meta-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {
  url: string = '';
  wapUrl: SafeUrl = '';
  fbUrl: string = '';
  defaultMetadata: PageMetadata = {
    title: 'Secret Message',
    description: `Send secret message to the user, they don't know who send him`,
    author: 'Sayon Chakraborty / Sk Masum',
    keywords: ['Annoymous', 'messages', 'Annoymous messages', 'Secret Message'],
    type: 'website',
  };
  iconList: Array<any> = [];
  encrUser: string | null;

  sharingOptions: { name: string; icon: string; color: string; href: SafeUrl; }[] = [];
  constructor(
    private _nativeShare: NgNavigatorShareService,
    private sanitizer: DomSanitizer,
    private _global: GlobalService,
    private meta: Meta,
    private title: Title
  ) {
    this.encrUser  = localStorage.getItem('encyptduser');
    this.iconList = [
      { icon: 'share1', routes: ['/secret-message/share-link/', this.encrUser], class: 'active'},
      { icon: 'message', routes: ['secret-message/messages/', this.encrUser], class: ''},
      { icon: 'account_profile', routes: ['/secret-message/view-profile'], class: ''},
    ];

    const imgUrl = 'assets/img/secret-covers.png';
          title.setTitle('Secret Message');
          meta.updateTag({
            name: 'description',
            content: `Send secret message to the user, they don't know who send him`,
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
          // metadata.generateMetaDefinitions(this.defaultMetadata);
          _global.watchPosition();
          _global.deviceDetection();
   }

  ngOnInit(): void {
    this.url = environment.hostingurl + localStorage.getItem('link');
    this.fbUrl = 'http://www.facebook.com/sharer.php?u=' + this.url;
    this.wapUrl = this.sanitizeUrl('whatsapp://send?text=' + this.url);

    this.sharingOptions = [
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

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async sendToDevice(url: string) {
    try {
      const sharedResponse = await this._nativeShare.share({
        title: 'Sharing to Whatsapp',
        text: 'Share anynomous message to Friend',
        url: url,
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log('You app is not shared, reason: ', error);
    }
  }

}