import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isLogoutVisible: boolean = true;
  public header: string = 'Secret Message';
  constructor(private _router: Router, private _global: GlobalService) {
    _global.headerSubject.subscribe((title) => {
      if (title) {
        this.header = title;
      }
    });
  }

  ngOnInit(): void {}

  onLogout() {
    localStorage.clear();
    this._router.navigate(['/secret-message/create']);
  }
}
