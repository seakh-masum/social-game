import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin';
  public sidenavArray: any[] = [
    { name: 'Dashboard', routerLink: '' },
    { name: 'Secret Messages', routerLink: 'pages/secret-messages' },
    { name: 'Love Calculator', routerLink: 'pages/love-calculator' },
    { name: 'Dare Games', routerLink: 'pages/dare-games' },
  ];
}
