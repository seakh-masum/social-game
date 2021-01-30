import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as htmlToImage from 'html-to-image';
import { GenericService } from 'src/app/services/generic.service';


@Component({
  selector: 'app-message-review',
  templateUrl: './message-review.component.html',
  styleUrls: ['./message-review.component.scss']
})
export class MessageReviewComponent implements OnInit {

  msgSendFlag: boolean= false;
  isButtonDisabled: boolean = true;
  
  constructor(
    private _generic: GenericService,
    private _dialogRef: MatDialogRef<MessageReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.genarateBase64Data('msg');
  }

  async genarateBase64Data(index: any) {
    let node = document.getElementById(index) as HTMLElement;
    let base64Image: any;
    let btnDisabled: boolean;
    await htmlToImage
      .toPng(node)
      .then(async function (dataUrl) {
        console.log(dataUrl);
        base64Image = dataUrl;
        btnDisabled = false;
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
      if(base64Image!=='') {
        this.isButtonDisabled = false;
      }
    this.data.params.base64image = base64Image;
  }

  sendMessage() {
     this._generic.post('savemessages', this.data.params).subscribe(
        (res: any) => {
          console.log(res);
          if (res['Status']) {
            // this.msg = '';
            this.msgSendFlag = true;
            this._dialogRef.close({msgSendFlag: this.msgSendFlag});
            // this._global.openSnackbar(res.Message, 'success');
            // this._dialog.open(DialogComponent);
          } else {
            // this._global.openSnackbar(res.Message, 'error');
          }
        },
        (err) => {
          // this._global.openSnackbar(err.Message, 'success');
        }
      );
  }
  
}
