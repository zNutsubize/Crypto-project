import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConverterComponent } from './components/converter.component';

@NgModule({
  declarations: [ConverterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ConverterComponent }]),
  ],
})
export class ConverterModule {}
