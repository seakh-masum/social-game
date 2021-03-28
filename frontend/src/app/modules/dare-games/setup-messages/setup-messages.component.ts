import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-setup-messages',
  templateUrl: './setup-messages.component.html',
  styleUrls: ['./setup-messages.component.scss'],
})
export class SetupMessagesComponent implements OnInit {
  public questions: any[] = [];
  constructor(
    private _generic: GenericService,
    private _global: GlobalService
  ) {}

  ngOnInit(): void {
    this.getQuestionsDetails();
  }
  getQuestionsDetails() {
    const url = 'dare-details';
    this._generic.get(url).subscribe(
      (res: any) => {
        if (res['Status']) {
          if (res['Data'] && res['Data'].length > 0) {
            res['Data'].forEach((element: any) => {
              this.questions.push({
                _id: element._id,
                answers: element.answers,
                date: element.date,
                question: element.question,
                checkFlag: false,
                answerValue: '',
              });
            });
            this.questions = this.questions.reverse();
            console.log(this.questions);
          } else {
            this._global.openSnackbar('No Message Present', 'Error');
          }
        } else {
          this._global.openSnackbar(res['Message'], 'Error');
        }
      },
      (err) => {
        this._global.openSnackbar(err.Message, 'Error');
      }
    );
  }
  onSubmit() {
    console.log(this.questions);
    if (this.questions && this.questions.length > 0) {
      let checkValue = 0;
      this.questions.forEach((x) => {
        if (x.checkFlag) {
          ++checkValue;
        }
      });
      if (checkValue < 5) {
        this._global.openSnackbar(
          'Minimum Five Questions you have to select',
          'Warning'
        );
        return false;
      } else if (checkValue > 10) {
        this._global.openSnackbar(
          'Maximum Ten Questions you have to select',
          'Warning'
        );
        return false;
      } else {
        let params: any = {
            questionid_and_answer: [],
          },
          errorFlag: number = 0,
          index: number = 0;
        this.questions.forEach((x: any, i: number) => {
          if (x.checkFlag && x.answerValue != '') {
            params['questionid_and_answer'].push({
              questionid: x._id,
              question: x.question,
              answers: x.answers,
              answerValue: x.answerValue,
            });
          } else {
            index = i;
            ++errorFlag;
          }
        });
        console.log(params);
        if (errorFlag > 0) {
          this._global.openSnackbar(
            `${this.questions[index]['question']}, answer is missing`,
            'Warning'
          );
          return false;
        } else {
          params['userid'] = localStorage.getItem('id');
          //daregames-user-questions-answers API is not ready yet
          this._generic
            .post('daregames-user-questions-answers', params)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res['Status']) {
                  this._global.openSnackbar(res.Message, 'success');
                } else {
                  this._global.openSnackbar(res.Message, 'error');
                }
              },
              (err) => {
                this._global.openSnackbar(err.Message, 'Error');
              }
            );
        }
      }
    }
    return true;
  }
}
