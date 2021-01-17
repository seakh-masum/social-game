import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  public userName: string = '';

  constructor(
    private _generic: GenericService,
    private _router: Router, 
  ) { }

  ngOnInit(): void {
  }

  createAccount(value: string) {
    console.log(value);
    
    const url = environment.secretbaseurl + 'savedetails';
    let data = {
      username: value,
      role: 'user'
    }
    this._generic.post(url, data).subscribe((response: any)=> {
      console.log(response);
      if(response['Status']) {
        if(response['Data']) {
          localStorage.setItem('link', response.Data[0].link);
          localStorage.setItem('token', response.Data[0].token);
          localStorage.setItem('displayName', response.Data[0].displayname);
          localStorage.setItem('id', response.Data[0]._id);
        }
        this._router.navigate([response.Data[0].link]);
      }
    });
  }

}
