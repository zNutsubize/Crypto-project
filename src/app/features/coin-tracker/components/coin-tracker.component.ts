import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { UsersApiService } from 'src/app/shared/services/users-api.service';
import { User } from '../../../shared/interfaces/user-interface';
import { CurrencyApiService } from '../services/currency-api.service';

@Component({
  selector: 'app-coin-tracker',
  templateUrl: './coin-tracker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./coin-tracker.component.scss'],
})
export class CoinTrackerComponent implements OnInit {
  constructor(
    private currencyApi: CurrencyApiService,
    private usersApi: UsersApiService
  ) {}

  ngOnInit(): void {
    this.getCurrencies();
  }

  public dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
    'favorites',
  ];

  public disableMethod(event: Event) {
    const target = event.target as HTMLButtonElement;
    target.disabled = true;
  }

  public getCurrencies() {
    this.currencyApi
      .getCurrency()
      .pipe(
        catchError((err) => {
          if (err) {
            console.error(err);
            return of(false);
          }
          return of(true);
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ADD FAVORITE

  public addFavorite(e: User): void {
    if (!this.usersApi.user.watchlist.includes(e.id)) {
      this.usersApi.user.watchlist.push(e.id);
      this.usersApi
        .update(this.usersApi.user, this.usersApi.user.id)
        .subscribe();
    }
  }

  public favorite: boolean = false;

  public checkFavorite(e: User): void {
    if (this.usersApi.user.watchlist.includes(e.id)) {
      this.favorite = true;
    }
  }

  public alert(): void {
    if (this.favorite) {
      alert('You already have this coin in your watchlist!');
      this.favorite = false;
    }
  }
}
