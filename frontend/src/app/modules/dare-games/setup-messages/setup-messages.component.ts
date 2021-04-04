import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WebShareService } from 'ng-web-share';
import { MessageReviewComponent } from 'src/app/secret-message/pages/message-review/message-review.component';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setup-messages',
  templateUrl: './setup-messages.component.html',
  styleUrls: ['./setup-messages.component.scss'],
})
export class SetupMessagesComponent implements OnInit {
  public questions: any[] = [];
  public uname: any = '';
  public upin: any = '';
  public url: any = '';
  public fbUrl: any = '';
  public wapUrl: any = '';
  public markArray: any[] = [];
  fileList: any;
  shareImgUrl: any =
    'https://res.cloudinary.com/dzruu87x0/image/upload/c_scale,h_200,w_200/v1617484678/screenshot-localhost_4200-2021.04.04-02_45_51_ddgdrq.png';
  public shareFlag: any;
  public isQuestionAvailFlag: boolean = false;
  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private webshareService: WebShareService,
    private sanitizer: DomSanitizer,
    private _router: Router,
    private _dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.url = environment.hostingurl + localStorage.getItem('darelink');
    this.fbUrl = 'http://www.facebook.com/sharer.php?u=' + this.url;
    this.wapUrl = this.sanitizeUrl('whatsapp://send?text=' + this.url);
    if (isPlatformBrowser(this.platformId)) {
      this.fileList = new DataTransfer();
      let that = this;
      that
        .urltoFile(
          this.shareImgUrl,
          `${new Date().getMilliseconds()}.gif`,
          'image/gif'
        )
        .then(function (file) {
          console.log(file);
          that.fileList.items.add(file);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    this.getDareUserDetails();
  }
  onEditQ() {
    this.questions = [];
    if (this.shareFlag) {
      this.shareFlag = false;
      this.getQuestionsDetails();
    } else {
      this.shareFlag = true;
      this.getUserQuestionsDetails();
    }
    window.scrollTo(0, 0);
  }
  getDareUserDetails() {
    const url = `dare-user-details/`;
    this._generic
      .get(url, String(localStorage.getItem('dareencyptduser')))
      .subscribe(
        (res: any) => {
          if (res['Status']) {
            if (res['Data'] && res['Data'].length > 0) {
              this.setData(res['Data'][0]);
              this.uname = localStorage.getItem('dareusername');
              this.upin = localStorage.getItem('dareuserpin');
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
  setData(data: any) {
    localStorage.setItem('darelink', data.link);
    localStorage.setItem('daretoken', data.token);
    localStorage.setItem('daredisplayName', data.displayname);
    localStorage.setItem('dareid', data._id);
    localStorage.setItem('dareencyptduser', data.encyptduser);
    localStorage.setItem('dareuserpin', data.userpin);
    localStorage.setItem('dareusername', data.username);
  }
  async shareData() {
    this._dialog
      .open(MessageReviewComponent, {
        data: {
          msg: this.markArray,
          from: 'dare-games',
        },
        panelClass: ['preview-msg'],
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }
  getUserQuestionsDetails() {
    const url = `qna-by-userid/`;
    this._generic.get(url, String(localStorage.getItem('dareid'))).subscribe(
      (res: any) => {
        if (res['Status']) {
          if (res['Data'] && res['Data'].length > 0) {
            this.markArray = res['Data'][0]['annonyUser'];
            res['Data'][0]['question_and_answer'].forEach((element: any) => {
              this.questions.push({
                _id: element.questionid,
                answers: element.answers,
                question: element.question,
                answerValue: element.answerValue,
                checkFlag: true,
                disabledFlag: true,
              });
            });
            console.log(this.questions);
            this.shareFlag = true;
            this.isQuestionAvailFlag = true;
          } else {
            this.shareFlag = false;
            this.getQuestionsDetails();
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
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  async urltoFile(url: any, filename: any, mimeType: any) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  urlCopied() {
    this._global.openSnackbar('Copied', 'Success');
  }
  async sendToDevice(url: string) {
    let list: any = this.fileList.files;
    if (!this.webshareService.canShareFile(list)) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
    await this.webshareService
      .share({
        title: 'Dare Games',
        text: `#❤️Hey 🙈 Answer to 🤟${localStorage.getItem(
          'daredisplayName'
        )}'s Questions and let ${localStorage.getItem(
          'daredisplayName'
        )} know how much you know to him/her😉❤️#`,
        url: url,
        files: list,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
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
    // console.log(this.questions);
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
          params['userid'] = localStorage.getItem('dareid');
          //daregames-user-questions-answers API is not ready yet
          this._generic
            .post('daregames-user-questions-answers', params)
            .subscribe(
              (res: any) => {
                console.log(res);
                if (res['Status']) {
                  this._global.openSnackbar(res.Message, 'success');
                  this.shareFlag = true;
                  this.questions = [];
                  this.getUserQuestionsDetails();
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
