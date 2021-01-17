import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.scss']
})
export class ViewMessageComponent implements OnInit {

  url: string = '';
  sharingOptions: any[] = [
    { name: 'Whatsapp Status', icon: 'whatsapp.svg', color: '#25D366'},
    { name: 'Facebook Status', icon: 'facebook.svg', color: '#3B5998'},
  ];
  messages: Array<any> = []; 
  paramsId: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _nativeShare: NgNavigatorShareService,
    private _generic: GenericService,
    private _router: Router,
  ) { 
    _route.params.pipe(map(p => p.id)).subscribe(res=> {
      console.log(res);
      this.paramsId = res;
    });
  }

  ngOnInit(): void {
    this.url = environment.hostingurl +  localStorage.getItem('link');
    this.getUserDetails();

  }

  getUserDetails(): void {
    const url = environment.secretbaseurl + 'user-details/' + atob(this.paramsId);
    console.log(url);
    this._generic.get(url).subscribe((res: any)=> {
      console.log(res);
      if(res['Status']) {
        if(res['Data']) {
          localStorage.setItem('link', res.Data[0].link);
          localStorage.setItem('token', res.Data[0].token);
          localStorage.setItem('displayName', res.Data[0].displayname);
          localStorage.setItem('id', res.Data[0]._id);
          this.getMessageDetails();
        }
        if(res.Data[0].encyptduser !== this.paramsId) {
          this._router.navigate(['/secret-message/sent']);
        }
      }
    })
  }

  getMessageDetails() {
    const url = environment.secretbaseurl + 'message-details/' + localStorage.getItem('id');
    this._generic.get(url).subscribe((res: any)=> {
      console.log(res);
      if(res['Status']) {
        this.messages = res.Data;
      }
    });
  }

  async sendToDevice(url: string) { 
    try{
      const sharedResponse = await this._nativeShare.share({
        title:'Sharing to Whatsapp',
        text: 'Share anynomous message to Friend',
        url: url
      });
      console.log(sharedResponse);
    } catch(error) {
      console.log('You app is not shared, reason: ',error);
    }
  }

}
