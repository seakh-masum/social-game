import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isLogoutVisible: boolean = true;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear();
    this._router.navigate(['/secret-message/create']);
  }

}
