import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tiles: any[] = [
    {text: 'Secret Message', cols: 2, color: 'blue', icon: 'comment', routes: '/secret-message/create', class: 'secret'},
    {text: 'Love Calculator', cols: 2,color: 'green', icon: 'favorite', routes: '/love-crush', class: 'love'},
    // {text: 'Flames', cols: 1, color: 'magenta', icon: 'games', routes: '/flames'},
  ];

  comingSoon: any[] = [
    {text: 'Flames', cols: 2, color: 'magenta', icon: 'games', routes: '/flames', class: 'flames'},
    {text: 'Dare Games', cols: 2, color: 'blue', icon: 'dangerous', routes: '/secret-message/create', class: 'dare'},
  ];

  constructor(
    private _router: Router,
    private _global: GlobalService,
  ) { }

  ngOnInit(): void {
  }

  onRoutes(routes: string) {
    this._router.navigate([routes]);
  }

  onOpenSnackbar(text: string) {
    this._global.openSnackbar(`${text} is now not available`, 'error');
  }

}
