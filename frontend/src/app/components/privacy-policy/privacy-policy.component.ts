import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<PrivacyPolicyComponent>
  ) { }

  ngOnInit(): void {
  }

  onAccept() {
    this._dialogRef.close({data: true});
  }

}
