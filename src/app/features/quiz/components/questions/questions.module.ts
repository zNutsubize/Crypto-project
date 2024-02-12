import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionsComponent } from './questions.component';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    RouterModule.forChild([{ path: '', component: QuestionsComponent }]),
  ],
})
export class QuestionsModule {}
