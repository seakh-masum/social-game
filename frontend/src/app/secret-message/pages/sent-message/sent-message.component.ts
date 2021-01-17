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

  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
  ) { }

  ngOnInit(): void {
  }

  sentMessage(msg: string) {
    console.log(msg);
    const url = environment.secretbaseurl + 'savemessages';
    let data = {
      userid: localStorage.getItem('id'),
      message: msg 
    }

    this._generic.post(url, data).subscribe((res: any)=> {
      console.log(res);
      this._global.openSnackbar(res.Message, 'success');
    });
    
  }

}
