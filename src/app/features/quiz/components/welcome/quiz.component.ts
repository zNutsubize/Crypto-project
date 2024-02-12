import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',

  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  @ViewChild('quizTaker') nameKey!: ElementRef;
  ngOnInit(): void {}

  public name: string = '';

  public startQuiz() {
    this.quizService.hasStarted = true;
    localStorage.setItem('quizTaker', this.nameKey.nativeElement.value);
  }
}
