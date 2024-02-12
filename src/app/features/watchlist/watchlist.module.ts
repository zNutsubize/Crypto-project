import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { WatchlistComponent } from './components/watchlist.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [WatchlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild([{ path: '', component: WatchlistComponent }]),
  ],
})
export class WatchlistModule {}
