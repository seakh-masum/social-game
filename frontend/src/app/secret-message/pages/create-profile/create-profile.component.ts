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
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit {
  public userName: string = '';
  public pin: string = '';

  public availableFlag: boolean = true;
  public timer: any;

  public keyUp = new Subject<KeyboardEvent>();

  keyupSubs: Subscription = new Subscription();
  isButtonDisabled: boolean = true;

  constructor(
    private _generic: GenericService,
    private _router: Router,
    private _global: GlobalService
  ) {}

  ngOnInit(): void {
    // this.keyupSubs = this.keyUp.pipe(
    //   map((event: KeyboardEvent)=> (event.target as HTMLInputElement).value),
    //   // debounceTime(1000),
    //   // distinctUntilChanged(),
    //   // mergeMap(search=> of(search).pipe(delay(500))),
    // ).subscribe(value=> {
    //   const url = environment.secretbaseurl + 'search-user/' + value;
    //   this._generic.get(url).subscribe((res: any)=> {
    //     if(res) {
    //       this.isButtonDisabled = false;
    //       if(res['Status']) {
    //         this.isPassword = true;
    //       }
    //     }
    //   })
    // });
  }
  searchChange(filter: any, to = false) {
    this.isButtonDisabled = true;
    filter = (<HTMLInputElement>filter.target).value;
    if (to) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (filter != '') {
          this.availableFlag = true;
          this._generic.get('search-user/', filter).subscribe(
            (res: any) => {
              if (res['Status']) {
                this.availableFlag = true;
                this.isButtonDisabled = false;
              } else {
                this.availableFlag = false;
                this.isButtonDisabled = false;
              }
            },
            (err) => {
              this.availableFlag = false;
              this.isButtonDisabled = false;
            }
          );
        } else {
          this.availableFlag = true;
          this.isButtonDisabled = true;
        }
      }, 700);
    }
  }
  createAccount(type: boolean) {
    if (type) {
      let data = {
        username: this.userName,
        role: 'user',
      };
      this.isButtonDisabled = true;
      this._generic.post('savedetails', data).subscribe(
        (response: any) => {
          console.log(response);
          if (response['Status']) {
            if (response['Data']) {
              this.isButtonDisabled = false;
              localStorage.setItem('link', response.Data[0].link);
              localStorage.setItem('token', response.Data[0].token);
              localStorage.setItem('displayName', response.Data[0].displayname);
              localStorage.setItem('id', response.Data[0]._id);
              localStorage.setItem('encyptduser', response.Data[0].encyptduser);
              localStorage.setItem('userpin', response.Data[0].userpin);
              localStorage.setItem('username', response.Data[0].username);
            }
            this._global.openSnackbar(response['Message'], 'success');
            this._router.navigate([response.Data[0].link]);
          } else {
            this.isButtonDisabled = false;
            this._global.openSnackbar(response['Message'], 'error');
          }
        },
        (err) => {
          this.isButtonDisabled = false;
          this._global.openSnackbar(err.Message, 'error');
        }
      );
    } else {
      let params = {
        username: this.userName,
        userpin: this.pin,
        role: 'user',
      };
      this._generic.post('user-login', params).subscribe(
        (response: any) => {
          console.log(response);
          if (response['Status']) {
            if (response['Data']) {
              localStorage.setItem('link', response.Data[0].link);
              localStorage.setItem('token', response.Data[0].token);
              localStorage.setItem('displayName', response.Data[0].displayname);
              localStorage.setItem('id', response.Data[0]._id);
              localStorage.setItem('encyptduser', response.Data[0].encyptduser);
              localStorage.setItem('userpin', response.Data[0].userpin);
              localStorage.setItem('username', response.Data[0].username);
            }
            this.isButtonDisabled = false;
            this._global.openSnackbar(response['Message'], 'success');
            this._router.navigate([response.Data[0].link]);
          } else {
            this.isButtonDisabled = false;
            this._global.openSnackbar(response['Message'], 'error');
          }
        },
        (err) => {
          this.isButtonDisabled = false;
          this._global.openSnackbar(err.Message, 'error');
        }
      );
    }
  }
}
