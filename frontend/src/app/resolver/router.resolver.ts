import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Buffer } from 'buffer';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { environment } from 'src/environments/environment';
import { GenericService } from '../services/generic.service';

@Injectable({ providedIn: 'root' })
export class RouterResolverService implements Resolve<any> {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private _metafrenzyservice: MetafrenzyService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _generic: GenericService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    let params = {};
    try {
      this._generic
        .get('user-details/', atob(activatedRouteSnapshot.url[1].path))
        .subscribe((resData: any) => {
          if (resData['Status']) {
            if (resData['Data']) {
              params = {
                title: `Send Secret Messages to ${resData['Data'][0].displayname}`,
                metatitle: `Send Secret Messages to ${resData['Data'][0].displayname}`,
                description: `#❤️Hey 🙈 message to 🤟${resData['Data'][0].displayname}🤟,😬😬 don't worry ${resData['Data'][0].displayname} will not know your name😉❤️#`,
                author: 'Sayon Chakraborty / Sk Masum',
                keywords: [
                  'Annoymous',
                  'messages',
                  'Annoymous messages',
                  'Secret Messages',
                ],
                type: 'website',
                feature_image:
                  'https://res.cloudinary.com/dzruu87x0/image/upload/c_scale,h_200,w_200/v1612033640/secret-message_lgicit.png',
                url: `${environment.hostingurl}secret-message/sent/${activatedRouteSnapshot.url[1].path}`,
              };
              this.setAdMetaData(params);
            }
          }
        });
    } catch (err) {
      this._generic
        .get(
          'user-details/',
          Buffer.from(activatedRouteSnapshot.url[1].path, 'base64').toString(
            'binary'
          )
        )
        .subscribe((resData: any) => {
          if (resData['Status']) {
            if (resData['Data']) {
              params = {
                title: `Send Secret Messages to ${resData['Data'][0].displayname}`,
                metatitle: `Send Secret Messages to ${resData['Data'][0].displayname}`,
                description: `#❤️Hey 🙈 message to 🤟${resData['Data'][0].displayname}🤟,😬😬 don't worry ${resData['Data'][0].displayname} will not know your name😉❤️#`,
                author: 'Sayon Chakraborty / Sk Masum',
                keywords: [
                  'Annoymous',
                  'messages',
                  'Annoymous messages',
                  'Secret Messages',
                ],
                type: 'website',
                feature_image:
                  'https://res.cloudinary.com/dzruu87x0/image/upload/c_scale,h_200,w_200/v1612033640/secret-message_lgicit.png',
                url: `${environment.hostingurl}secret-message/sent/${activatedRouteSnapshot.url[1].path}`,
              };
              this.setAdMetaData(params);
            }
          }
        });
    }
  }

  setAdMetaData(ad_seo_data: any) {
    this.metaService.removeTag('description');

    this.titleService.setTitle(ad_seo_data.title);
    if (ad_seo_data.metatitle && ad_seo_data.metatitle != '') {
      this.metaService.updateTag({
        name: 'title',
        content: ad_seo_data.metatitle,
      });
    } else {
      this.metaService.updateTag({ name: 'title', content: ad_seo_data.title });
    }
    this.metaService.updateTag({
      name: 'description',
      content: ad_seo_data.description,
    });
    if (ad_seo_data.keywords && ad_seo_data.keywords != '') {
      this.metaService.removeTag('keywords');
      this.metaService.updateTag({
        name: 'keywords',
        content: ad_seo_data.keywords,
      });
    }
    /* Facebook */
    if (ad_seo_data.title && ad_seo_data.title != '') {
      this.metaService.updateTag({
        property: 'og:title',
        content: ad_seo_data.title,
      });
      this.metaService.updateTag({
        property: 'twitter:title',
        content: ad_seo_data.title,
      });
      this.metaService.removeTag('name');
      this.metaService.updateTag({
        itemprop: 'name',
        content: ad_seo_data.title,
      });
    }

    if (ad_seo_data.feature_image && ad_seo_data.feature_image != '') {
      this.metaService.updateTag({
        property: 'og:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        property: 'twitter:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        itemprop: 'image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        name: 'twitter:site',
        content: '@Secret Messages',
      });
    }
    if (ad_seo_data.description && ad_seo_data.description != '') {
      this.metaService.updateTag({
        property: 'og:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        property: 'twitter:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        itemprop: 'description',
        content: ad_seo_data.description,
      });
    }
    this.metaService.updateTag({ name: 'geo.country', content: 'IN' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    // let copyrightText = "Copyright (c) 2000-"+this.copyrightYear+" Secret Messages.";
    // this.metaService.updateTag({ name: 'rights', content: copyrightText });
    // this.metaService.updateTag({ name: 'Copyright', content: copyrightText });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'author',
      content: 'Sayon Chakraborty / Sk Masum',
    });
    this.metaService.updateTag({
      property: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
    this.metaService.updateTag({ property: 'og:locale', content: 'en-us' });
    this.metaService.updateTag({
      property: 'fb:app_id',
      content: '455538855453181',
    });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Secret Messages',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    // if (ad_seo_data.url) {
    this._metafrenzyservice.setLinkTag({
      rel: 'canonical',
      href: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: ad_seo_data.url,
    });
    // }
    if (!ad_seo_data['nofollow']) {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }
    if (ad_seo_data['nofollow']) {
      this.metaService.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
      this.metaService.updateTag({ name: 'googlebot', content: 'noindex' });
    }
    // this.googleRemarketingTags(ad_seo_data);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class FlamesResolverService implements Resolve<any> {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private _metafrenzyservice: MetafrenzyService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _generic: GenericService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    let params = {
      title: 'Flames',
      metatitle: 'Flames',
      description:
        "Hey play 😜Flames game😜 and share to 👉Social Media👈 where everyone can see 😍You and Your friend's😍 best match",
      author: 'Sayon Chakraborty / Sk Masum',
      keywords: ['flames', 'play flames', 'games', 'flames gmae'],
      type: 'website',
      feature_image:
        'https://res.cloudinary.com/dzruu87x0/image/upload/c_scale,h_200,w_200/v1612033640/secret-message_lgicit.png',
      url: `${environment.hostingurl}flames`,
    };
    this.setAdMetaData(params);
  }

  setAdMetaData(ad_seo_data: any) {
    this.metaService.removeTag('description');

    this.titleService.setTitle(ad_seo_data.title);
    if (ad_seo_data.metatitle && ad_seo_data.metatitle != '') {
      this.metaService.updateTag({
        name: 'title',
        content: ad_seo_data.metatitle,
      });
    } else {
      this.metaService.updateTag({ name: 'title', content: ad_seo_data.title });
    }
    this.metaService.updateTag({
      name: 'description',
      content: ad_seo_data.description,
    });
    if (ad_seo_data.keywords && ad_seo_data.keywords != '') {
      this.metaService.removeTag('keywords');
      this.metaService.updateTag({
        name: 'keywords',
        content: ad_seo_data.keywords,
      });
    }
    /* Facebook */
    if (ad_seo_data.title && ad_seo_data.title != '') {
      this.metaService.updateTag({
        property: 'og:title',
        content: ad_seo_data.title,
      });
      this.metaService.updateTag({
        property: 'twitter:title',
        content: ad_seo_data.title,
      });
      this.metaService.removeTag('name');
      this.metaService.updateTag({
        itemprop: 'name',
        content: ad_seo_data.title,
      });
    }

    if (ad_seo_data.feature_image && ad_seo_data.feature_image != '') {
      this.metaService.updateTag({
        property: 'og:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        property: 'twitter:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        itemprop: 'image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        name: 'twitter:site',
        content: '@Secret Messages',
      });
    }
    if (ad_seo_data.description && ad_seo_data.description != '') {
      this.metaService.updateTag({
        property: 'og:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        property: 'twitter:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        itemprop: 'description',
        content: ad_seo_data.description,
      });
    }
    this.metaService.updateTag({ name: 'geo.country', content: 'IN' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    // let copyrightText = "Copyright (c) 2000-"+this.copyrightYear+" Secret Messages.";
    // this.metaService.updateTag({ name: 'rights', content: copyrightText });
    // this.metaService.updateTag({ name: 'Copyright', content: copyrightText });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'author',
      content: 'Sayon Chakraborty / Sk Masum',
    });
    this.metaService.updateTag({
      property: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
    this.metaService.updateTag({ property: 'og:locale', content: 'en-us' });
    this.metaService.updateTag({
      property: 'fb:app_id',
      content: '455538855453181',
    });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Secret Messages',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    // if (ad_seo_data.url) {
    this._metafrenzyservice.setLinkTag({
      rel: 'canonical',
      href: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: ad_seo_data.url,
    });
    // }
    if (!ad_seo_data['nofollow']) {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }
    if (ad_seo_data['nofollow']) {
      this.metaService.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
      this.metaService.updateTag({ name: 'googlebot', content: 'noindex' });
    }
    // this.googleRemarketingTags(ad_seo_data);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class LovecrushResolverService implements Resolve<any> {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private _metafrenzyservice: MetafrenzyService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _generic: GenericService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    let params = {
      title: 'Love Calculator',
      metatitle: 'Love Calculator',
      description:
        "Calculate 🥰You and Your's Crush🥰 💞Love Percentage💞 and get 😘Perfect Match😘",
      author: 'Sayon Chakraborty / Sk Masum',
      keywords: ['love calculator', 'love', 'calculator', 'gf bf calculator'],
      type: 'website',
      feature_image:
        'https://res.cloudinary.com/dzruu87x0/image/upload/c_scale,h_200,w_200/v1612033640/secret-message_lgicit.png',
      url: `${environment.hostingurl}love-crush`,
    };
    this.setAdMetaData(params);
  }

  setAdMetaData(ad_seo_data: any) {
    this.metaService.removeTag('description');

    this.titleService.setTitle(ad_seo_data.title);
    if (ad_seo_data.metatitle && ad_seo_data.metatitle != '') {
      this.metaService.updateTag({
        name: 'title',
        content: ad_seo_data.metatitle,
      });
    } else {
      this.metaService.updateTag({ name: 'title', content: ad_seo_data.title });
    }
    this.metaService.updateTag({
      name: 'description',
      content: ad_seo_data.description,
    });
    if (ad_seo_data.keywords && ad_seo_data.keywords != '') {
      this.metaService.removeTag('keywords');
      this.metaService.updateTag({
        name: 'keywords',
        content: ad_seo_data.keywords,
      });
    }
    /* Facebook */
    if (ad_seo_data.title && ad_seo_data.title != '') {
      this.metaService.updateTag({
        property: 'og:title',
        content: ad_seo_data.title,
      });
      this.metaService.updateTag({
        property: 'twitter:title',
        content: ad_seo_data.title,
      });
      this.metaService.removeTag('name');
      this.metaService.updateTag({
        itemprop: 'name',
        content: ad_seo_data.title,
      });
    }

    if (ad_seo_data.feature_image && ad_seo_data.feature_image != '') {
      this.metaService.updateTag({
        property: 'og:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        property: 'twitter:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        itemprop: 'image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        name: 'twitter:site',
        content: '@Secret Messages',
      });
    }
    if (ad_seo_data.description && ad_seo_data.description != '') {
      this.metaService.updateTag({
        property: 'og:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        property: 'twitter:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        itemprop: 'description',
        content: ad_seo_data.description,
      });
    }
    this.metaService.updateTag({ name: 'geo.country', content: 'IN' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    // let copyrightText = "Copyright (c) 2000-"+this.copyrightYear+" Secret Messages.";
    // this.metaService.updateTag({ name: 'rights', content: copyrightText });
    // this.metaService.updateTag({ name: 'Copyright', content: copyrightText });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'author',
      content: 'Sayon Chakraborty / Sk Masum',
    });
    this.metaService.updateTag({
      property: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
    this.metaService.updateTag({ property: 'og:locale', content: 'en-us' });
    this.metaService.updateTag({
      property: 'fb:app_id',
      content: '455538855453181',
    });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Secret Messages',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    // if (ad_seo_data.url) {
    this._metafrenzyservice.setLinkTag({
      rel: 'canonical',
      href: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: ad_seo_data.url,
    });
    // }
    if (!ad_seo_data['nofollow']) {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }
    if (ad_seo_data['nofollow']) {
      this.metaService.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
      this.metaService.updateTag({ name: 'googlebot', content: 'noindex' });
    }
    // this.googleRemarketingTags(ad_seo_data);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class DareGamesResolverService implements Resolve<any> {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private _metafrenzyservice: MetafrenzyService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _generic: GenericService
  ) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    let params = {};
    console.log(window.location.href);
    if (window.location.href.includes('share-link')) {
      this._generic
        .get('dare-user-details/', activatedRouteSnapshot.url[1].path)
        .subscribe((resData: any) => {
          if (resData['Status']) {
            if (resData['Data']) {
              params = {
                title: `Dare games with ${resData['Data'][0].displayname}`,
                metatitle: `Dare games with ${resData['Data'][0].displayname}`,
                description: `#❤️Hey 🙈 answer to 🤟${resData['Data'][0].displayname}'s question🤟,and let 😬😬${resData['Data'][0].displayname}😬😬 know how much you know about him/her😉❤️#`,
                author: 'Sayon Chakraborty / Sk Masum',
                keywords: ['dare', 'dare games', 'play dare games'],
                type: 'website',
                feature_image:
                  'https://res.cloudinary.com/dzruu87x0/image/upload/c_thumb,w_200,g_face/v1617484678/screenshot-localhost_4200-2021.04.04-02_45_51_ddgdrq.png',
                url: `${environment.hostingurl}dare-games/share-link/${activatedRouteSnapshot.url[1].path}`,
              };
              this.setAdMetaData(params);
            }
          }
        });
    } else {
      if (isPlatformBrowser(this.platformId)) {
        if (window.location.href.includes('auth')) {
          params = {
            title: `Dare games`,
            metatitle: `Dare games`,
            description:
              '❤️Create an 😬account😬 and choose your questions and share to your 🤟friend🤟 to show who knows you well❤️',
            author: 'Sayon Chakraborty / Sk Masum',
            keywords: ['dare', 'dare games', 'play dare games'],
            type: 'website',
            feature_image:
              'https://res.cloudinary.com/dzruu87x0/image/upload/c_thumb,w_200,g_face/v1617484678/screenshot-localhost_4200-2021.04.04-02_45_51_ddgdrq.png',
            url: `${environment.hostingurl}dare-games/auth`,
          };
        } else {
          params = {
            title: `Dare games`,
            metatitle: `Dare games`,
            description:
              '❤️Create an 😬account😬 and choose your questions and share to your 🤟friend🤟 to show who knows you well❤️',
            author: 'Sayon Chakraborty / Sk Masum',
            keywords: ['dare', 'dare games', 'play dare games'],
            type: 'website',
            feature_image:
              'https://res.cloudinary.com/dzruu87x0/image/upload/c_thumb,w_200,g_face/v1617484678/screenshot-localhost_4200-2021.04.04-02_45_51_ddgdrq.png',
            url: `${environment.hostingurl}dare-games/create-question-answer`,
          };
        }
      }
      this.setAdMetaData(params);
    }
  }

  setAdMetaData(ad_seo_data: any) {
    this.metaService.removeTag('description');

    this.titleService.setTitle(ad_seo_data.title);
    if (ad_seo_data.metatitle && ad_seo_data.metatitle != '') {
      this.metaService.updateTag({
        name: 'title',
        content: ad_seo_data.metatitle,
      });
    } else {
      this.metaService.updateTag({ name: 'title', content: ad_seo_data.title });
    }
    this.metaService.updateTag({
      name: 'description',
      content: ad_seo_data.description,
    });
    if (ad_seo_data.keywords && ad_seo_data.keywords != '') {
      this.metaService.removeTag('keywords');
      this.metaService.updateTag({
        name: 'keywords',
        content: ad_seo_data.keywords,
      });
    }
    /* Facebook */
    if (ad_seo_data.title && ad_seo_data.title != '') {
      this.metaService.updateTag({
        property: 'og:title',
        content: ad_seo_data.title,
      });
      this.metaService.updateTag({
        property: 'twitter:title',
        content: ad_seo_data.title,
      });
      this.metaService.removeTag('name');
      this.metaService.updateTag({
        itemprop: 'name',
        content: ad_seo_data.title,
      });
    }

    if (ad_seo_data.feature_image && ad_seo_data.feature_image != '') {
      this.metaService.updateTag({
        property: 'og:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        property: 'twitter:image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        itemprop: 'image',
        content: ad_seo_data.feature_image,
      });
      this.metaService.updateTag({
        name: 'twitter:site',
        content: '@Secret Messages',
      });
    }
    if (ad_seo_data.description && ad_seo_data.description != '') {
      this.metaService.updateTag({
        property: 'og:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        property: 'twitter:description',
        content: ad_seo_data.description,
      });
      this.metaService.updateTag({
        itemprop: 'description',
        content: ad_seo_data.description,
      });
    }
    this.metaService.updateTag({ name: 'geo.country', content: 'IN' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    // let copyrightText = "Copyright (c) 2000-"+this.copyrightYear+" Secret Messages.";
    // this.metaService.updateTag({ name: 'rights', content: copyrightText });
    // this.metaService.updateTag({ name: 'Copyright', content: copyrightText });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'author',
      content: 'Sayon Chakraborty / Sk Masum',
    });
    this.metaService.updateTag({
      property: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
    this.metaService.updateTag({ property: 'og:locale', content: 'en-us' });
    this.metaService.updateTag({
      property: 'fb:app_id',
      content: '455538855453181',
    });
    this.metaService.updateTag({ property: 'og:image:width', content: '1200' });
    this.metaService.updateTag({ property: 'og:image:height', content: '630' });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'Secret Messages',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    // if (ad_seo_data.url) {
    this._metafrenzyservice.setLinkTag({
      rel: 'canonical',
      href: ad_seo_data.url,
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: ad_seo_data.url,
    });
    // }
    if (!ad_seo_data['nofollow']) {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    }
    if (ad_seo_data['nofollow']) {
      this.metaService.updateTag({
        name: 'robots',
        content: 'noindex, nofollow',
      });
      this.metaService.updateTag({ name: 'googlebot', content: 'noindex' });
    }
    // this.googleRemarketingTags(ad_seo_data);
    return true;
  }
}
