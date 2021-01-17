import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Injectable()
export class DynamicMetadataService {
  constructor(public title: Title, public metaTag: Meta) {}
  getRouteData(pageName: any = '') {
    this.title.setTitle(pageName);
    let content = ``;
    if (pageName == 'Sender') {
      content = `<p>Send message to user</p>`;
    } else {
      content = `<p>Checkout your messages</p>`;
    }
    this.metaTag.addTag({
      name: 'Anonymous Messages',
      content: content,
    });
  }
}
