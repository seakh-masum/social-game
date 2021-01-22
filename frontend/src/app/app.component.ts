import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'social-game';
  constructor() {
    if (environment.production) {
      console.log = console.debug = console.error = () => {};
    }
  }
}
