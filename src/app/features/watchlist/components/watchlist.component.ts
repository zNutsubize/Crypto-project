import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';
import { UsersApiService } from 'src/app/shared/services/users-api.service';
import { CurrencyApiService } from '../../coin-tracker/services/currency-api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  constructor(
    private usersApi: UsersApiService,
    private currencyApi: CurrencyApiService
  ) {}

  ngOnInit(): void {
    this.getCoin();
  }

  public favorites = this.usersApi.user.watchlist;
  public favCoins: any = [];
  public favCoins$ = new BehaviorSubject<any>([]);

  public getCoin(): void {
    this.favorites.forEach((element) => {
      this.currencyApi
        .getCurrencyById(element)
        .pipe(
          catchError((err) => {
            if (err) {
              console.error(err);
              return of(false);
            }
            return of(true);
          })
        )
        .subscribe((res) => {
          if (res) {
            this.favCoins.push(res);
            this.favCoins$.next(this.favCoins);
          }
        });
    });
  }

  public deleteFavorite(index: number): void {
    this.usersApi.user.watchlist.splice(index, 1);

    this.usersApi.update(this.usersApi.user, this.usersApi.user.id).subscribe();

    this.favorites = this.usersApi.user.watchlist;

    if (this.favCoins.length === 1) {
      this.favCoins$.next([]);
    }

    this.favCoins = [];

    this.favorites.forEach((element) => {
      this.currencyApi
        .getCurrencyById(element)
        .pipe(
          catchError((err) => {
            if (err) {
              console.error(err);
              return of(false);
            }
            return of(true);
          })
        )
        .subscribe((res) => {
          if (res) {
            this.favCoins.push(res);
            this.favCoins$.next(this.favCoins);
          }
        });
    });
  }

  p: number = 1;
}
