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
    this.authForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this._generic.post('login-admin', this.authForm.value).subscribe(
        (res: any) => {
          if (res['Status']) {
            localStorage.setItem('LoginTime', new Date().toString());
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
