import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private _snackbar: MatSnackBar,
  ) { }

  openSnackbar(msg: string, type: string) {
    this._snackbar.open(msg, 'X', {
      panelClass: [type]
    });
  }
}
