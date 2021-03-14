import { Component, OnInit } from '@angular/core';
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
    private _global: GlobalService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    //submit value
    this._generic.post('love-percentage', this.loveJSON).subscribe(
      (res: any) => {
        if (res['Status']) {
          if (res['Data']) {
            this.percentage = res['Data']['percentage'];
            // this.loveJSON['uname'] = '';
            // this.loveJSON['crushname'] = '';
          }
        }
      },
      (err) => {
        this._global.openSnackbar(err.Message, 'Error');
      }
    );
  }
}
