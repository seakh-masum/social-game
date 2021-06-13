import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<SuccessDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onDialogClose(value: boolean) {
    this._dialogRef.close({status: value});
  }

}
