import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivacyPolicyComponent } from 'src/app/components/privacy-policy/privacy-policy.component';
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
  isButtonDisabled: boolean = false;
  loginFlag: boolean = false;
  privacyPolicy: boolean = false;

  constructor(
    private _generic: GenericService,
    private _router: Router,
    private _global: GlobalService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  // searchChange(filter: any, to = false) {
  //   this.isButtonDisabled = true;
  //   filter = (<HTMLInputElement>filter.target).value;
  //   if (to) {
  //     clearTimeout(this.timer);
  //     this.timer = setTimeout(() => {
  //       if (filter != '') {
  //         this.availableFlag = true;
  //         this._generic.get('search-user/', filter).subscribe(
  //           (res: any) => {
  //             if (res['Status']) {
  //               this.availableFlag = true;
  //               this.isButtonDisabled = false;
  //             } else {
  //               this.availableFlag = false;
  //               this.isButtonDisabled = false;
  //             }
  //           },
  //           (err) => {
  //             this.availableFlag = false;
  //             this.isButtonDisabled = false;
  //           }
  //         );
  //       } else {
  //         this.availableFlag = true;
  //         this.isButtonDisabled = true;
  //       }
  //     }, 700);
  //   }
  // }
  toogleChange() {
    this.availableFlag = !this.availableFlag;
    this.userName = '';
    this.pin = '';
    this.loginFlag = !this.loginFlag;
    if (!this.availableFlag) {
      this.privacyPolicy = false;
    }
  }
  setData(data: any) {
    localStorage.setItem('link', data.link);
    localStorage.setItem('token', data.token);
    localStorage.setItem('displayName', data.displayname);
    localStorage.setItem('id', data._id);
    localStorage.setItem('encyptduser', data.encyptduser);
    localStorage.setItem('userpin', data.userpin);
    localStorage.setItem('username', data.username);
  }

  postData(url: string, data: any) {
    this.isButtonDisabled = true;
    this._generic.post(url, data).subscribe(
      (response: any) => {
        console.log(response);
        if (response['Status']) {
          if (response['Data']) {
            this.setData(response.Data[0]);
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

  createAccount(type: boolean) {
    let data: any = {
      username: this.userName,
      role: 'user',
    };
    if (type) {
      if (this.privacyPolicy) {
        this.postData('savedetails', data);
      } else {
        this._global.openSnackbar('Please accept the privacy policy', 'error');
      }
    } else {
      data.userpin = this.pin;
      this.postData('user-login', data);
    }
  }

  openPrivacyPolicy(event: any) {
    console.log(event);
    if (event.checked) {
      this._dialog
        .open(PrivacyPolicyComponent)
        .afterClosed()
        .subscribe((res) => {
          this.privacyPolicy = res.data;
          // this.isButtonDisabled = res.data;
        });
    } else {
      this._global.openSnackbar('Please accept the privacy policy', 'error');
    }
  }
}
