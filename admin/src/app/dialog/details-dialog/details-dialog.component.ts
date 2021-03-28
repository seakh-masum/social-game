import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
})
export class DetailsDialogComponent implements OnInit, OnDestroy {
  private subscribtion: Subscription[] = [];
  public panelOpenState: boolean;
  public loveCrush: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogComponent,
    private _generic: GenericService,
    private _snackBar: MatSnackBar
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    if (this.data['action'] === 'secret-messages') {
      this.getMessages();
    } else if (this.data['action'] === 'love-crush') {
      this.loveCrush = new FormGroup({
        _id: new FormControl(this.data['userDetails']['_id'], [
          Validators.required,
        ]),
        uname: new FormControl(this.data['userDetails']['uname'], [
          Validators.required,
        ]),
        crushname: new FormControl(this.data['userDetails']['crushname'], [
          Validators.required,
        ]),
        percentage: new FormControl(this.data['userDetails']['percentage'], [
          Validators.required,
        ]),
      });
    }
  }
  getMessages() {
    this.subscribtion.push(
      this._generic
        .get('message-details/', this.data['userDetails']['_id'])
        .subscribe(
          (res: any) => {
            if (res['Status']) {
              if (res['Data'] && res['Data'].length > 0) {
                this.data['messageDetails'] = res['Data'][0]['messagedetails'];
                console.log(this.data['messageDetails']);
              } else {
                this._snackBar.open(res['Message'], 'Error', {
                  duration: 3000,
                });
              }
            } else {
              this._snackBar.open(res['Message'], 'Error', { duration: 3000 });
            }
          },
          (err) => {
            this._snackBar.open(err.Message, 'Error', { duration: 3000 });
          }
        )
    );
  }
  onSubmit() {
    if (this.loveCrush.valid) {
      this.subscribtion.push(
        this._generic
          .post('edit-love-calculator', this.loveCrush.value)
          .subscribe(
            (res: any) => {
              if (res['Status']) {
                this._snackBar.open(res['Message'], 'Success', {
                  duration: 3000,
                });
                this._dialogRef.close(1);
              } else {
                this._snackBar.open(res['Message'], 'Error', {
                  duration: 3000,
                });
              }
            },
            (err) => {
              this._snackBar.open(err.Message, 'Error', { duration: 3000 });
            }
          )
      );
    }
  }
  ngOnDestroy() {
    this.subscribtion.forEach((e) => e.unsubscribe());
  }
}
