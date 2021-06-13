import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-love-crush',
  templateUrl: './love-crush.component.html',
  styleUrls: ['./love-crush.component.scss'],
})
export class LoveCrushComponent implements OnInit {
  public loveJSON: any = {
    uname: '',
    crushname: '',
  };
  public percentage: any = '';
  constructor(
    private _generic: GenericService,
    private _global: GlobalService,
    private _router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //submit value

    this._router.navigate(['/love-crush/result'], {
      queryParams: {
        uname: this.loveJSON.uname, crushname: this.loveJSON.crushname,
      }
    });

    
  }
}
