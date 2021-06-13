import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-annoynomous-users',
  templateUrl: './annoynomous-users.component.html',
  styleUrls: ['./annoynomous-users.component.scss'],
})
export class AnnoynomousUsersComponent implements OnInit {
  public questions: any[] = [];
  public username: String = 'User';
  public annoyName: String = '';
  public flag: boolean = false;
  public userid: any = '';
  public markArray: any[] = [];
  public markFlag: boolean = false;
  public uname: any = '';
  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._route.params.pipe(map((p) => p.id)).subscribe((res: any) => {
      if (res) {
        console.log(
          atob(res),
          atob(String(localStorage.getItem('dareencyptduser')))
        );
        this.uname = res;
        if (isPlatformBrowser(platformId)) {
          if (
            !localStorage.getItem('dareencyptduser') ||
            (localStorage.getItem('dareencyptduser') &&
              atob(res) !=
                atob(String(localStorage.getItem('dareencyptduser'))))
          ) {
            this.getDareUserDetails(res);
          } else if (
            atob(res) === atob(String(localStorage.getItem('dareencyptduser')))
          ) {
            _router.navigate(['/dare-games/create-question-answer']);
          }
        }
      }
    });
  }

  ngOnInit(): void {}

  getDareUserDetails(username: string = '') {
    const url = `dare-user-details/`;
    this._generic.get(url, username).subscribe(
      (res: any) => {
        if (res['Status']) {
          console.log(res['Data']);
          if (res['Data'] && res['Data'].length > 0) {
            this.username = res['Data'][0]['displayname'];
            this.userid = res['Data'][0]['_id'];
            this.getUserQuestionsDetails();
          }
        } else {
          this._global.openSnackbar(res['Message'], 'Error');
          this._router.navigate(['dare-games/auth']);
          localStorage.removeItem('darelink');
          localStorage.removeItem('daretoken');
          localStorage.removeItem('daredisplayName');
          localStorage.removeItem('dareid');
          localStorage.removeItem('dareencyptduser');
          localStorage.removeItem('dareuserpin');
          localStorage.removeItem('dareusername');
        }
      },
      (err) => {
        this._global.openSnackbar(err.Message, 'Error');
      }
    );
  }
  getUserQuestionsDetails() {
    const url = `qna-by-userid/`;
    this._generic.get(url, this.userid).subscribe(
      (res: any) => {
        if (res['Status']) {
          if (res['Data'] && res['Data'].length > 0) {
            this.markArray = res['Data'][0]['annonyUser'];
            res['Data'][0]['question_and_answer'].forEach(
              (element: any, index: any) => {
                if (index === 0) {
                  this.questions.push({
                    _id: element.questionid,
                    answers: element.answers,
                    question: element.question,
                    answerValue: element.answerValue,
                    userValue: '',
                    showFlag: true,
                  });
                } else {
                  this.questions.push({
                    _id: element.questionid,
                    answers: element.answers,
                    question: element.question,
                    answerValue: element.answerValue,
                    userValue: '',
                    showFlag: false,
                  });
                }
              }
            );
            console.log(this.questions);
          } else {
            this._global.openSnackbar(
              `${this.username}'s has no Questions to play`,
              'Warning'
            );
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
    let wValue = 0;
    this.questions.forEach((e) => {
      if (e.answerValue === e.userValue) {
        ++wValue;
      }
    });
    let params = {
      userid: this.userid,
      annonyUser: {
        username: this.annoyName,
        marks: String(wValue + '/' + this.questions.length),
      },
    };
    this._generic.post('daregames-annoymouse-user-value', params).subscribe(
      (res: any) => {
        if (res['Status']) {
          console.log(res);
          if (res['Data']) {
            this.markArray = this.markArray = res['Data']['annonyUser'];
            this.markArray = this.markArray.reverse();
            this.markFlag = true;
          } else {
            this._global.openSnackbar(res['Message'], 'Warning');
          }
        } else {
          this._global.openSnackbar(res['Message'], 'Error');
        }
      },
      (err: any) => {
        this._global.openSnackbar(err.Message, 'Error');
      }
    );
  }
}
