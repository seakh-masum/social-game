import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from './services/generic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin';
  public header: any = '';
  public adminName: any = '';
  public creatinDate: any = '';
  public isLogin: boolean;
  public sidenavArray: any[] = [
    { name: 'Dashboard', routerLink: '' },
    { name: 'Secret Messages', routerLink: 'pages/secret-messages' },
    { name: 'Love Calculator', routerLink: 'pages/love-calculator' },
    { name: 'Dare Games', routerLink: 'pages/dare-games' },
    { name: 'Social Games', routerLink: 'pages/social-games' },
  ];
  constructor(private _router: Router, public _generic: GenericService) {
    _generic.loginState.subscribe((flag) => {
      this.isLogin = flag;
    });
    _generic.headerSubject.subscribe((data) => {
      this.header = data.header;
    });
    this.adminName = localStorage.getItem('uname');
    this.creatinDate = localStorage.getItem('date');
  }
  logout() {
    localStorage.clear();
    this.isLogin = false;
    this._router.navigate(['/login-admin']);
  }
}
