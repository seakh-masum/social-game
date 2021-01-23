import { Component, OnInit, Optional } from '@angular/core';
import { DomSanitizer, Meta, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { MetadataService } from 'src/app/services/meta-data.service';
import { environment } from 'src/environments/environment';
// import { NgSocialLinksService } from 'ng-social-links';
import { PageMetadata } from '../../../services/meta-data.service';

interface Config {
  url?: string;
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
})
export class ViewMessageComponent implements OnInit {
  url: string = '';
  messages: Array<any> = [];
  facebookShareLink: any;
  wapUrl: SafeUrl = '';
  fbUrl: string = '';
  sharingOptions: any[] = [];

  defaultMetadata: PageMetadata = {
    title: 'Secret Message',
    description: `Send secret message to the user, they don't know who send him`,
    author: 'Sayon Chakraborty / Sk Masum',
    keywords: ['Annoymous', 'messages', 'Annoymous messages', 'Secret Message'],
    type: 'website',
  };
  constructor(
    private _route: ActivatedRoute,
    private _nativeShare: NgNavigatorShareService,
    private _generic: GenericService,
    private _router: Router,
    private _global: GlobalService,
    @Optional() private metadataService: MetadataService,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title // private socialLinks: NgSocialLinksService,
  ) {
    _route.params.pipe(map((p) => p.id)).subscribe((res) => {
      console.log(res);
      if (res) {
        _global.userId = res;
        if (
          typeof localStorage.getItem('encyptduser') !== undefined &&
          localStorage.getItem('encyptduser') == res
        ) {
          // metadata.updateMetadata({
          //   title: 'Secret Message',
          //   description: `Send secret message to the user, they don't know who send him`
          // });
          const imgUrl = '/assets/img/secret-covers.png';
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
    this.url = environment.hostingurl + localStorage.getItem('link');
    this.fbUrl = 'http://www.facebook.com/sharer.php?u=' + this.url;
    this.wapUrl = this.sanitizeUrl(
      'whatsapp://send?text=' + encodeURIComponent(this.url)
    );

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
  onReload() {
    window.location.reload();
  }
  async sendToDeviceMessage(messageData: any) {
    // Social Message Share
    if (await navigator.share) {
      console.log('Web Share APIs are supported');
      navigator.share({
        title: 'Bits and pieces: Web Share API article',
        text: 'Web Share API feature is awesome. You must check it',
        url: window.location.href,
      });
    } else {
      console.log('Web Share APIs are not supported');
    }
  }
  getMessageDetails() {
    const url = 'message-details/' + localStorage.getItem('id');
    this._generic.get(url).subscribe((res: any) => {
      console.log(res);
      if (res['Status']) {
        this.messages = res.Data;
      }
    });
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
