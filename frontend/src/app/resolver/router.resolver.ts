import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterResolverService implements Resolve<any> {
  constructor(private titleService: Title, private metaService: Meta) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    console.log(window.location.href);
    let params = {
      title: 'Send Secret Messages',
      metatitle: 'Send Secret Messages',
      description: `#❤️Hey 🙈 message to 🤟${atob(
        activatedRouteSnapshot.url[1].path
      )}🤟,😬😬 don't worry ${atob(
        activatedRouteSnapshot.url[1].path
      )} will not know your name😉❤️#`,
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
      url: window.location.href,
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
        name: 'twitter:image',
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
        name: 'twitter:description',
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
      name: 'og:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      name: 'twitter:url',
      content: ad_seo_data.url,
    });
    this.metaService.updateTag({
      name: 'author',
      content: 'Sayon Chakraborty / Sk Masum',
    });
    this.metaService.updateTag({
      name: 'referrer',
      content: 'no-referrer-when-downgrade',
    });
    this.metaService.updateTag({ property: 'og:locale', content: 'en-us' });
    // this.metaService.updateTag({ property: 'fb:app_id', content: GlobalVariable.FACEBOOK_APP_ID });
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
      name: 'twitter:card',
      content: 'summary_large_image',
    });
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
