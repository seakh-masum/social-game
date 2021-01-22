import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.scss']
})
export class SentMessageComponent implements OnInit {

  public msg: string = '';
  userId: any = '';

  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const url = environment.secretbaseurl + 'user-details/' + atob(this._global.userId);
    console.log(url);
    this._generic.get(url).subscribe((res: any)=> {
      console.log(res);
      if(res['Status']) {
        if(res['Data']) {
          localStorage.setItem('token', res.Data[0].token);
          this.userId = res.Data[0]._id;
        }
      }
    });
  }

  sentMessage(msg: string) {
    console.log(msg);
    const url = environment.secretbaseurl + 'savemessages';
    let data = {
      userid: this.userId,
      message: msg 
    }

    this._generic.post(url, data).subscribe((res: any)=> {
      console.log(res);
      this._global.openSnackbar(res.Message, 'success');
    });
    
  }

}
