import { Component, OnInit, Optional } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { MetadataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss'],
})
export class ViewMessageComponent implements OnInit {
  messages: Array<any> = [];
 
  constructor(
    private _route: ActivatedRoute,
    private _generic: GenericService,
    private _router: Router,
    private _global: GlobalService,
    @Optional() private metadataService: MetadataService,
    private meta: Meta,
    private title: Title
  ) {
    _route.params.pipe(map((p) => p.id)).subscribe((res) => {
      if (res) {
        _global.userId = res;
        if (
          typeof localStorage.getItem('encyptduser') !== undefined &&
          localStorage.getItem('encyptduser') == res
        ) {
<<<<<<< HEAD
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
=======
>>>>>>> origin/masum
          this.getMessageDetails();
        } else {
          this._router.navigate(['/secret-message/sent/' + _global.userId]);
        }
      } else {
        this._router.navigate(['/secret-message/create']);
      }
    });
  }

  ngOnInit(): void {}


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

  
}
