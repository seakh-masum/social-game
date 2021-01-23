import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  public userName: string | null = '';
  public pin: string | null = '';
  isButtonDisabled: boolean = true;


  constructor(
    private _routes: ActivatedRoute,
    private _global: GlobalService,
    private _generic: GenericService,

  ) { 
    _routes.params.pipe(map((p) => p.id)).subscribe((res)=> {
      if(res) {
        _global.userId = res;
      }
    })
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.pin = localStorage.getItem('userpin');
  }

  updateProfile() {
    const url = 'change-userpin/';
    // if(this.pin !== localStorage.getItem('userpin')) {
      // this.isButtonDisabled = false;
      const data = {
        username: this.userName,
        userpin: this.pin
      }
      this._generic.post(url, data).subscribe((res: any)=> {
        if(res['Status']) {
          this._global.openSnackbar(res['Message'], 'success');
        }
      });
    // }
  }

  onKeyup(event: any) {
    event = (<HTMLInputElement>event.target).value;
    if(event !== localStorage.getItem('userpin')) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  // getProfileDetails() {
  //   this._generic.getip(url).subscribe((res: any)=> {

  //   });
  // }

}
