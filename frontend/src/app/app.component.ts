import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'social-game';
  isLogoutVisible: boolean = true;
  isBottombarVisible: boolean = true;
  isLoggedIn: boolean = true;
  activeIcon: string = '';
  scrollTop: number = 0;
  hideBar: boolean = false;
  // iconList = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title
  ) {
    // if (environment.production) {
    //   console.log = console.debug = console.error = () => {};
    // }
    if (navigator.serviceWorker) {
      console.log('Will the service worker register?');
      navigator.serviceWorker
        .register('./ngsw-worker.js')
        .then(function (reg) {
          console.log('Yes, it did:', reg);
        })
        .catch(function (err) {
          console.log("No it didn't. This happened: ", err);
        });
    }
    _router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        _router.navigated = false; // the Router into believing it's last link wasn't previously loaded
        const routing_data: any =
            _activatedRoute.root.firstChild?.children[0].snapshot.data,
          current_url = _router.url.split('?')[0];

        this.setPageConfig(current_url, routing_data);
      });
  }

  setPageConfig(current_url: string, routing_data: any) {
    if (routing_data.title) {
      this._title.setTitle(routing_data.title);
    }
    console.log(routing_data);
    this.title = routing_data.title;
    // this.isBottombarVisible = routing_data.isBottombarVisible !== undefined && routing_data.isBottombarVisible ? true : false;
    this.isLoggedIn =
      routing_data.isLoggedIn !== undefined && routing_data.isLoggedIn
        ? true
        : false;
    this.activeIcon =
      routing_data.activeIcon !== undefined ? routing_data.activeIcon : '';
  }

  onScroll(event: any) {
    this.hideBar = this.scrollTop < event.target.scrollTop;
    this.scrollTop = event.target.scrollTop;
  }
}
