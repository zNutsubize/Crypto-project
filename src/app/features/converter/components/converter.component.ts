import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, observable, Observable, of } from 'rxjs';
import { CurrencyData } from '../interfaces/currency-data';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-converter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  constructor(public http: ConverterService) {}

  ngOnInit(): void {
    this.getCurrencies();
  }

  public default: string = 'BTC';

  public formGroup = new FormGroup({
    value: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
    result: new FormControl(),
  });

  public data: BehaviorSubject<Array<CurrencyData>> = new BehaviorSubject<
    Array<CurrencyData>
  >([]);

  public result: number = 0;
  public resultCheck: boolean = false;

  public getRate(): void {
    let total: number =
      this.formGroup.get('value')?.value *
      (this.formGroup.get('from')?.value / this.formGroup.get('to')?.value);

    this.result = Math.round(total * 100000) / 100000;
    if (this.result === Infinity) {
      this.result = 0;
    }
  }

  public getCurrencies(): void {
    this.http
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
          this.data.next(res);
        }
      });
  }
}
