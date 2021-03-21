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
  selector: 'app-love-calculator',
  templateUrl: './love-calculator.component.html',
  styleUrls: ['./love-calculator.component.scss'],
})
export class LoveCalculatorComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'uname',
    'crushname',
    'percentage',
    'date',
    'action',
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
    this.getLoveCalculatorUsers();
  }

  getLoveCalculatorUsers(currentPage = 0, totalSize = 10) {
    this.subscribtion.push(
      this._generic
        .get(
          'flames-users',
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
    this.getLoveCalculatorUsers(this.currentPage, this.pageSize);
  }
  onEdit(details: any) {
    let dialog = this._dialog.open(DetailsDialogComponent, {
      data: {
        userDetails: details,
        action: 'love-crush',
      },
    });
    this.subscribtion.push(
      dialog.afterClosed().subscribe((res) => {
        if (res == 1) {
          this.getLoveCalculatorUsers(this.currentPage, this.totalSize);
        }
      })
    );
  }
  onDelete(id: any) {
    let dialog = this._dialog.open(DetailsDialogComponent, {
      data: {
        action: 'delete-popup',
      },
    });
    this.subscribtion.push(
      dialog.afterClosed().subscribe((res) => {
        if (res == 1) {
          this.subscribtion.push(
            this._generic.delete('delete-details/', id, 'love-crush').subscribe(
              (res: any) => {
                if (res['Status']) {
                  this._snackBar.open(res['Message'], 'Success', {
                    duration: 3000,
                  });
                  this.getLoveCalculatorUsers(this.currentPage, this.totalSize);
                } else {
                  this._snackBar.open(res['Message'], 'Error', {
                    duration: 3000,
                  });
                }
              },
              (err) => {
                this._snackBar.open(err.Message, 'Error', { duration: 3000 });
              }
            )
          );
        }
      })
    );
  }
  blankTab() {
    window.open('https://socail-game.web.app/love-crush', '_blank');
  }
  ngOnDestroy() {
    this.subscribtion.forEach((e) => e.unsubscribe());
  }
}
