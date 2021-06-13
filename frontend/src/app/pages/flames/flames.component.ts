import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flames',
  templateUrl: './flames.component.html',
  styleUrls: ['./flames.component.scss'],
})
export class FlamesComponent implements OnInit {
  public nameJSON: any = {
    firstName: '',
    secondName: '',
  };
  public alreadyJson: any = {
    firstName: '',
    secondName: '',
    lastString: '',
    totalLength: 0,
  };
  public index = 0;
  public myInterVal: any;
  public staticArray = [
    { shortWord: 'F', longWord: 'Friends' },
    { shortWord: 'L', longWord: 'Lovers' },
    { shortWord: 'A', longWord: 'Affectionate' },
    { shortWord: 'M', longWord: 'Marraige' },
    { shortWord: 'E', longWord: 'Enemy' },
    { shortWord: 'S', longWord: 'Siblings' },
  ];
  public displayFlag: boolean = false;
  public loaderFlag: boolean = false;
  public indexLoader: number = 0;
  public loaderInterval: any;
  public showValue: string = '';
  public playFlag: boolean = true;
  public hideFlag: boolean = false;

  constructor(
    private _router: Router,
  ) {}
  ngOnInit() {}

  onSubmit() {
    // console.log(this.nameJSON);
    // if (!this.nameJSON.firstName) {
    //   // this._snackBar.open("Enter First Name",'Warning');
    //   alert('Enter First Name');
    //   return false;
    // }
    // if (!this.nameJSON.secondName) {
    //   // this._snackBar.open("Enter Second Name",'Warning');
    //   alert('Enter Second Name');
    //   return false;
    // }
    // if (
    //   this.nameJSON.firstName.includes(' ') ||
    //   this.nameJSON.secondName.includes(' ')
    // ) {
    //   alert('Space Not Allow in Name');
    //   return false;
    // }
    // console.log({
    //   '1st Name': this.nameJSON.firstName.length,
    //   '2nd Name': this.nameJSON.secondName.length,
    // });
    // this.alreadyJson = {
    //   firstName: this.nameJSON.firstName,
    //   secondName: this.nameJSON.secondName,
    // };
    // let that = this;
    // this.playFlag = false;
    // this.displayFlag = true;
    // this.loaderFlag = true;
    // this.displayLoader();
    // this.myInterVal = setInterval(function () {
    //   that.index = 0;
    //   if (
    //     that.alreadyJson.firstName.length < that.alreadyJson.secondName.length
    //   ) {
    //     if (that.index < that.alreadyJson.firstName.length) {
    //       that.getSameChar(
    //         that.alreadyJson.secondName.toLowerCase().split(''),
    //         that.alreadyJson.firstName.toLowerCase().split(''),
    //         that.index
    //       );
    //       ++that.index;
    //     } else {
    //       clearInterval(that.myInterVal);
    //     }
    //   } else {
    //     if (that.index < that.alreadyJson.secondName.length) {
    //       that.getSameChar(
    //         that.alreadyJson.firstName.toLowerCase().split(''),
    //         that.alreadyJson.secondName.toLowerCase().split(''),
    //         that.index
    //       );
    //       ++that.index;
    //     } else {
    //       clearInterval(that.myInterVal);
    //     }
    //   }
    // }, 1000);
    // return;
    this._router.navigate(['/flames/cross-words'], {
      queryParams: {
        uname: this.nameJSON.firstName,
        pname: this.nameJSON.secondName,
      }
    })

  }

  getSameChar(str2: any[] = [], str1: any = ([] = []), index: number) {
    console.log(str2, str1);
    if (str2.includes(str1[index])) {
      this.alreadyJson.firstName = this.alreadyJson.firstName
        .toLowerCase()
        .replace(str1[index], '&')
        .split('&')
        .join('');
      this.alreadyJson.secondName = this.alreadyJson.secondName
        .toLowerCase()
        .replace(str1[index], '&')
        .split('&')
        .join('');
      this.alreadyJson.lastString =
        this.alreadyJson.firstName + this.alreadyJson.secondName;
      this.alreadyJson.totalLength = this.alreadyJson.lastString.length;
      console.log({
        String: str1[index],
        Index: index,
        '1st Name': this.alreadyJson.firstName,
        '1st Name Length': this.alreadyJson.firstName.length,
        '2nd Name': this.alreadyJson.secondName,
        '2nd Name Length': this.alreadyJson.secondName.length,
        'Generated String': this.alreadyJson.lastString,
        'Total Length': this.alreadyJson.totalLength,
      });
    } else if (str1.includes(str2[index])) {
      this.alreadyJson.firstName = this.alreadyJson.firstName
        .toLowerCase()
        .replace(str2[index], '&')
        .split('&')
        .join('');
      this.alreadyJson.secondName = this.alreadyJson.secondName
        .toLowerCase()
        .replace(str2[index], '&')
        .split('&')
        .join('');
      this.alreadyJson.lastString =
        this.alreadyJson.firstName + this.alreadyJson.secondName;
      this.alreadyJson.totalLength = this.alreadyJson.lastString.length;
      console.log({
        String: str2[index],
        Index: index,
        '1st Name': this.alreadyJson.firstName,
        '1st Name Length': this.alreadyJson.firstName.length,
        '2nd Name': this.alreadyJson.secondName,
        '2nd Name Length': this.alreadyJson.secondName.length,
        'Generated String': this.alreadyJson.lastString,
        'Total Length': this.alreadyJson.totalLength,
      });
    } else if (!str1.includes(str2[index]) && !str2.includes(str1[index])) {
      let temp = 0;
      str2.forEach((element: any) => {
        if (str1.includes(element)) {
          ++temp;
          this.alreadyJson.firstName = this.alreadyJson.firstName
            .toLowerCase()
            .replace(element, '&')
            .split('&')
            .join('');
          this.alreadyJson.secondName = this.alreadyJson.secondName
            .toLowerCase()
            .replace(element, '&')
            .split('&')
            .join('');
          this.alreadyJson.lastString =
            this.alreadyJson.firstName + this.alreadyJson.secondName;
          this.alreadyJson.totalLength = this.alreadyJson.lastString.length;
          console.log({
            String: element,
            Index: index,
            '1st Name': this.alreadyJson.firstName,
            '1st Name Length': this.alreadyJson.firstName.length,
            '2nd Name': this.alreadyJson.secondName,
            '2nd Name Length': this.alreadyJson.secondName.length,
            'Generated String': this.alreadyJson.lastString,
            'Total Length': this.alreadyJson.totalLength,
          });
        }
      });
      if (temp == 0) {
        this.alreadyJson.lastString =
          this.alreadyJson.firstName + this.alreadyJson.secondName;
        this.alreadyJson.totalLength = this.alreadyJson.lastString.length;
        clearInterval(this.myInterVal);
        console.log({
          String: str1[index],
          Index: index,
          '1st Name': this.alreadyJson.firstName,
          '1st Name Length': this.alreadyJson.firstName.length,
          '2nd Name': this.alreadyJson.secondName,
          '2nd Name Length': this.alreadyJson.secondName.length,
          'Generated String': this.alreadyJson.lastString,
          'Total Length': this.alreadyJson.totalLength,
        });
        if (
          this.alreadyJson.lastString &&
          this.alreadyJson.lastString.length <= this.staticArray.length
        ) {
          console.log(
            'You and Your Crush are:',
            this.staticArray[this.alreadyJson.lastString.length - 1][
              'shortWord'
            ],
            'means:',
            this.staticArray[this.alreadyJson.lastString.length - 1]['longWord']
          );
          this.showValue = this.staticArray[
            this.alreadyJson.lastString.length - 1
          ]['longWord'];
        } else if (
          this.alreadyJson.lastString &&
          this.alreadyJson.lastString.length > this.staticArray.length
        ) {
          let indexValue = this.alreadyJson.lastString.length;
          if (this.alreadyJson.lastString.length % 6 === 0) {
            console.log(
              'You and Your Crush are:',
              this.staticArray[5]['shortWord'],
              'means:',
              this.staticArray[5]['longWord']
            );
            this.showValue = this.staticArray[5]['longWord'];
          } else {
            for (
              let i = 1;
              i <= parseInt(String(this.alreadyJson.lastString.length / 6));
              i++
            ) {
              indexValue -= 6;
            }
            console.log(
              'You and Your Crush are:',
              this.staticArray[indexValue - 1]['shortWord'],
              'means:',
              this.staticArray[indexValue - 1]['longWord']
            );
            this.showValue = this.staticArray[indexValue - 1]['longWord'];
          }
        }
        this.hideFlag = true;
        this.loaderFlag = false;
        this.displayLoader();
      }
    } else if (str2 && str1) {
      str2.forEach((element: any) => {
        console.log(element, str1.includes(element));
        if (!str1.includes(element) ? true : false) {
          this.alreadyJson.lastString =
            this.alreadyJson.firstName + this.alreadyJson.secondName;
          this.alreadyJson.totalLength = this.alreadyJson.lastString.length;
          clearInterval(this.myInterVal);
          console.log({
            String: str1[index],
            Index: index,
            '1st Name': this.alreadyJson.firstName,
            '1st Name Length': this.alreadyJson.firstName.length,
            '2nd Name': this.alreadyJson.secondName,
            '2nd Name Length': this.alreadyJson.secondName.length,
            'Generated String': this.alreadyJson.lastString,
            'Total Length': this.alreadyJson.totalLength,
          });
        } else {
          console.log('as6e');
        }
      });
    }
  }

  displayLoader() {
    console.log(this.loaderFlag);
    if (this.loaderFlag) {
      let that = this;
      that.loaderInterval = setInterval(function () {
        if (that.indexLoader <= 5) {
          that.showValue = that.staticArray[that.indexLoader]['longWord'];
          that.indexLoader += 1;
        } else {
          that.indexLoader = 0;
          that.showValue = that.staticArray[that.indexLoader]['longWord'];
          that.indexLoader += 1;
        }
      }, 500);
    } else {
      console.log(this.loaderFlag);
      clearInterval(this.loaderInterval);
    }
  }
  playAgain() {
    this.hideFlag = false;
    this.playFlag = true;
    this.displayFlag = false;
    this.loaderFlag = false;
    this.nameJSON = {
      firstName: '',
      secondName: '',
    };
    this.alreadyJson = {
      firstName: '',
      secondName: '',
      lastString: '',
      totalLength: 0,
    };
  }
}
