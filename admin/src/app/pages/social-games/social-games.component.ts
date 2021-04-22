import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-social-games',
  templateUrl: './social-games.component.html',
  styleUrls: ['./social-games.component.scss'],
})
export class SocialGamesComponent implements OnInit {
  public incr: number = 0;
  public frontendIcon: any = { icon: '', title: '', number: this.incr };
  public iconArray: any[] = [];
  constructor(
    private _generic: GenericService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {
    _generic.headerSubject.next(this._activatedRoute.snapshot.data);
  }

  ngOnInit(): void {}

  onPreview() {
    console.log(this.frontendIcon);
    if (
      this.iconArray &&
      this.iconArray.findIndex((x) => x.number === this.frontendIcon.number) ===
        -1
    ) {
      this.iconArray.push(this.frontendIcon);
      this.incr += 1;
      this.frontendIcon = {
        icon: '',
        title: '',
        number: this.incr,
      };
    } else {
      this.iconArray[this.frontendIcon['number']] = this.frontendIcon;
      this.frontendIcon = {
        icon: '',
        title: '',
        number: this.incr,
      };
    }
  }
  onEdit(index: number) {
    this.frontendIcon = {
      icon: this.iconArray[index]['icon'],
      title: this.iconArray[index]['title'],
      number: this.iconArray[index]['number'],
    };
  }
  onCancel(index: number) {}
  onSave() {}
}
