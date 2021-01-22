import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  public userName: string = '';
  public pin: string = '';
  public isPassword: boolean = false;

  public keyUp = new Subject<KeyboardEvent>();

  keyupSubs: Subscription = new Subscription();
  isButtonDisabled: boolean = true;

  constructor(
    private _generic: GenericService,
    private _router: Router, 
    private _global: GlobalService,
  ) { }

  ngOnInit(): void {

    this.keyupSubs = this.keyUp.pipe(
      map((event: KeyboardEvent)=> (event.target as HTMLInputElement).value),
      // debounceTime(1000),
      // distinctUntilChanged(),
      // mergeMap(search=> of(search).pipe(delay(500))),
    ).subscribe(value=> {
      const url = environment.secretbaseurl + 'search-user/' + value;

      this._generic.get(url).subscribe((res: any)=> {
        if(res) {
          this.isButtonDisabled = false;
          if(res['Status']) {
            this.isPassword = true;
          }
        }
      })
    });
    
  }

  createAccount(value: string) {
    console.log(value);
    
    const url = environment.secretbaseurl + 'savedetails';
    let data: any = {
      username: value,
      role: 'user'
    }

    if(this.isPassword) {
      data.userpin = this.pin;;
    }
    if(this.isButtonDisabled) {
      this._global.openSnackbar('Please fill the credentials', 'error');
    } 
    this._generic.post(url, data).subscribe((response: any)=> {
      console.log(response);
      if(response['Status']) {
        if(response['Data']) {
          localStorage.setItem('link', response.Data[0].link);
          localStorage.setItem('token', response.Data[0].token);
          localStorage.setItem('displayName', response.Data[0].displayname);
          localStorage.setItem('id', response.Data[0]._id);
          localStorage.setItem('encyptduser', response.Data[0].encyptduser);
        }
        this._router.navigate([response.Data[0].link]);
      }
    });
  }

}
