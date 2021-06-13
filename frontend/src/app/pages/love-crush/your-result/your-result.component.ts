import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-your-result',
  templateUrl: './your-result.component.html',
  styleUrls: ['./your-result.component.scss']
})
export class YourResultComponent implements OnInit {

  uname: string = '';
  crushname: string = '';
  percentage: number = 0;

  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private _routes: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getRoutesData();
  }

  getRoutesData() {
    this._routes.queryParams.subscribe((params: any)=> {
      if(params!== undefined) {
        this.uname = params.uname;
        this.crushname = params.crushname;
        const data = {
          uname: params.uname,
          crushname: params.crushname,
        }
        this.getPercentages(data);
      }
    });
  }

  getPercentages(data: any) {
    this._generic.post('love-percentage', data).subscribe(
      (res: any) => {
        if (res['Status']) {
          if (res['Data']) {
            this.percentage = res['Data']['percentage'];
          }
        }
      },
      (err) => {
        this._global.openSnackbar(err.Message, 'Error');
      }
    );
  }

  

}
