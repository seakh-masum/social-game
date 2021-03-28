import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  public authForm: FormGroup;
  constructor(
    private _generic: GenericService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this._generic.isLogin()) {
      this._router.navigate(['']);
    }
    this.authForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.authForm.valid) {
      this._generic.post('login-admin', this.authForm.value).subscribe(
        (res: any) => {
          if (res['Status']) {
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('LoginTime', new Date().toString());
            localStorage.setItem('uname', res['Data'][0]['admin']);
            localStorage.setItem('date', res['Data'][0]['date']);
            this._snackBar.open(res['Message'], 'Success', { duration: 3000 });
            this._router.navigate(['']);
          } else {
            this._snackBar.open(res['Message'], 'Error', { duration: 3000 });
          }
        },
        (err) => {
          this._snackBar.open(err.Message, 'Error', { duration: 3000 });
        }
      );
    }
  }
}
