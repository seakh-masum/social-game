import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DetailsDialogComponent } from 'src/app/dialog/details-dialog/details-dialog.component';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-dare-game',
  templateUrl: './dare-game.component.html',
  styleUrls: ['./dare-game.component.scss'],
})
export class DareGameComponent implements OnInit {
  public step = 0;
  public dynamicExpension: any[] = [];
  public qLength: number;
  public imageSrc: any;
  public subscribtion: Subscription[] = [];
  public listingFlag: boolean = true;
  public listingArray: any[] = [];

  constructor(
    private _generic: GenericService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getqnaList();
  }
  getqnaList() {
    this.subscribtion.push(
      this._generic.get('dare-details').subscribe(
        (res: any) => {
          if (res['Status']) {
            if (res['Data']) {
              console.log(res['Data']);
              this.listingArray = res['Data'];
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
  qLengthSubmit() {
    if (this.qLength && this.qLength > 0) {
      for (let i = 0; i < this.qLength; i++) {
        this.dynamicExpension.push({
          no: i + 1,
          question: '',
          answers: [],
          available: false,
        });
      }
      console.log(this.dynamicExpension);
    } else {
      this._snackBar.open('Please Enter Valid Length', 'Warning', {
        duration: 3000,
      });
    }
  }
  readURL(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.dynamicExpension[index]['image'] = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    if (this.step === this.qLength - 1) {
      let flag = false;
      this.dynamicExpension.forEach((e) => {
        console.log(e);
        if (
          e['question'] === '' ||
          (e['answers'] && e['answers'].length === 0) ||
          e['answers'] === '' ||
          e['answers'][1] === '' ||
          e['answers'][2] === '' ||
          e['answers'][3] === ''
        ) {
          flag = true;
        }
      });
      if (flag === false) {
        let dialog = this._dialog.open(DetailsDialogComponent, {
          data: {
            action: 'add-popup',
          },
        });
        this.subscribtion.push(
          dialog.afterClosed().subscribe((res) => {
            if (res == 1) {
              if (this.hasDuplicates()) {
                return false;
              }
              this.subscribtion.push(
                this._generic
                  .post('add-qna-dare', { qna: this.dynamicExpension })
                  .subscribe(
                    (res: any) => {
                      if (res['Status']) {
                        this._snackBar.open(res['Message'], 'Success', {
                          duration: 3000,
                        });
                        this.getqnaList();
                        this.dynamicExpension.splice(0);
                      } else {
                        this._snackBar.open(res['Message'], 'Error', {
                          duration: 3000,
                        });
                      }
                    },
                    (err) => {
                      this._snackBar.open(err.Message, 'Error', {
                        duration: 3000,
                      });
                    }
                  )
              );
            }
          })
        );
      } else {
        this._snackBar.open('Plese Submit All Required Fields', 'Warning', {
          duration: 3000,
        });
      }
    }
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  hasDuplicates() {
    for (let i = 0; i < this.dynamicExpension.length; i++) {
      let question = this.dynamicExpension[i].question,
        qLength = 0,
        index = ' ';
      for (let j = 0; j < this.dynamicExpension.length; j++) {
        if (this.dynamicExpension[j].question === question) {
          index += j + 1 + ',';
          ++qLength;
        }
      }
      if (qLength >= 2) {
        this._snackBar.open(`Question no.${index} is Same.`, 'Warning', {
          duration: 3000,
        });
        return true;
      }
    }
    return false;
  }
  onEdit(item: any) {
    if (
      item &&
      item['question'] != '' &&
      item['answers'][0] != '' &&
      item['answers'][1] != '' &&
      item['answers'][2] != '' &&
      item['answers'][3] != ''
    ) {
      this.subscribtion.push(
        this._generic.post('add-qna-dare', { qna: [item] }).subscribe(
          (res: any) => {
            if (res['Status']) {
              this._snackBar.open(res['Message'], 'Success', {
                duration: 3000,
              });
              this.getqnaList();
            } else {
              this._snackBar.open(res['Message'], 'Error', {
                duration: 3000,
              });
            }
          },
          (err) => {
            this._snackBar.open(err.Message, 'Error', {
              duration: 3000,
            });
          }
        )
      );
    } else {
      this._snackBar.open('Plese Submit All Required Fields', 'Warning', {
        duration: 3000,
      });
    }
  }
  onDelete(id: string) {
    let dialog = this._dialog.open(DetailsDialogComponent, {
      data: {
        action: 'delete-popup',
      },
    });
    this.subscribtion.push(
      dialog.afterClosed().subscribe((res) => {
        if (res == 1) {
          this.subscribtion.push(
            this._generic.delete('delete-details/', id, 'dare-games').subscribe(
              (res: any) => {
                if (res['Status']) {
                  this._snackBar.open(res['Message'], 'Success', {
                    duration: 3000,
                  });
                  this.getqnaList();
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
      })
    );
  }
}
