import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DetailsDialogComponent } from 'src/app/dialog/details-dialog/details-dialog.component';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-secret-messages',
  templateUrl: './secret-messages.component.html',
  styleUrls: ['./secret-messages.component.scss'],
})
export class SecretMessagesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    '_id',
    'username',
    'userpin',
    'displayname',
    'encyptduser',
    'longitude',
    'latitude',
    'link',
    'date',
    'view_message',
  ];
  dataSource: MatTableDataSource<[]>;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public subscribtion: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _generic: GenericService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMessageDetails();
  }

  getMessageDetails(currentPage = 0, totalSize = 10) {
    this.subscribtion.push(
      this._generic
        .get(
          'secret-message-user-details',
          'currentPage',
          String(currentPage + 1),
          String(totalSize)
        )
        .subscribe(
          (res: any) => {
            if (res['Status']) {
              if (res['Data']) {
                console.log(res['Data']);
                this.dataSource = res['Data'];
                this.totalSize = res['Count'];
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getMessageDetails(this.currentPage, this.pageSize);
  }
  blankTab(link: string) {
    window.open('https://socail-game.web.app/' + link, '_blank');
  }
  viewMessage(userData: any) {
    //View Message popup
    let dialog = this._dialog.open(DetailsDialogComponent, {
      data: {
        userDetails: userData,
        messageDetails: [],
        action: 'secret-messages',
      },
      width: '100%',
    });
    this.subscribtion.push(dialog.afterClosed().subscribe());
  }
  ngOnDestroy() {
    this.subscribtion.forEach((x) => x.unsubscribe());
  }
}
