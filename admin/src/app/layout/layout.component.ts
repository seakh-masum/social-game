import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenericService } from '../services/generic.service';
import { Chart } from '../../../node_modules/chart.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public subscribtion: Subscription[] = [];
  public dashBoard: any[] = [];
  public year: any[] = [];
  public CurrentYear: any = new Date().getFullYear();
  constructor(
    private _activatedRoute: ActivatedRoute,
    public _generic: GenericService,
    private _snackBar: MatSnackBar
  ) {
    _generic.headerSubject.next(this._activatedRoute.snapshot.data);
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserDetailsByYear();
  }
  getUserDetails() {
    this.subscribtion.push(
      this._generic.get('get-total-userdetails').subscribe(
        (res: any) => {
          if (res['Status']) {
            if (res['Data']) {
              console.log(res['Data']);
              this.dashBoard = res['Data'];
            }
          } else {
            this._snackBar.open(res['Message'], 'Error', { duration: 3000 });
          }
        },
        (err) => {
          this._snackBar.open(err.Message, 'Error', { duration: 3000 });
        }
      )
    );
  }
  getUserDetailsByYear(year = new Date().getFullYear()) {
    this.subscribtion.push(
      this._generic
        .get('get-userdetails-by-year/', year.toString())
        .subscribe((res: any) => {
          if (res['Status']) {
            this.year = res['Data']['year'];
            console.log(year);
            var chart = new Chart('chart-0', res['Data']['config']);
            chart.update();
          }
        })
    );
  }
  ngOnDestroy() {
    this.subscribtion.forEach((x) => x.unsubscribe());
  }
}
