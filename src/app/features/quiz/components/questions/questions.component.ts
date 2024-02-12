import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAnswer } from '../interfaces/ianswer';

@Component({
  selector: 'app-questions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor() {}

  public quizTaker: string = '';

  public currentQuestion: number = 0;

  public points: number = 0;

  public correctAnswer: number = 0;

  public incorrectAnswer: number = 0;

  public progress: number = 0;

  public quizCompleted: boolean = false;

  ngOnInit(): void {
    this.quizTaker = localStorage.getItem('quizTaker')!;
  }

  public nextQuestion(): void {
    this.currentQuestion++;
  }

  public previousQuestion(): void {
    this.currentQuestion--;
  }

  public answersFn(currentQuestion: number, answer: IAnswer): void {
    if (currentQuestion === this.questions.length) {
      this.quizCompleted = true;
    }
    if (answer.correct) {
      this.points++;
      this.correctAnswer++;
      this.currentQuestion++;
      this.progress += 25;
    } else {
      this.points--;
      this.incorrectAnswer++;
      this.currentQuestion++;
      this.progress += 25;
    }
  }

  public resetQuiz(): void {
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = 0;
  }

  public questions = [
    {
      questionText:
        'Which of the following is popularly used for storing bitcoins?',
      answers: [
        {
          text: 'Pocket',
        },
        {
          text: 'Wallet',
          correct: true,
        },
        {
          text: 'Box',
        },
        {
          text: 'Stack',
        },
      ],
    },
    {
      questionText: 'What does the block in the blockchain consist of?',
      answers: [
        {
          text: 'Transaction data',
        },
        {
          text: 'A Hash point',
        },
        {
          text: 'A Timestamp',
        },
        {
          text: 'All of these',
          correct: true,
        },
      ],
    },
    {
      questionText: 'How many new Bitcoins are created every day?',
      answers: [
        {
          text: '2200 Except of leap year',
        },
        {
          text: '3600',
          correct: true,
        },
        {
          text: '7200',
        },
        {
          text: '5000',
        },
      ],
    },
    {
      questionText: 'Where is the bitcoin central server located?',
      answers: [
        {
          text: 'Washington DC',
        },
        {
          text: 'Undisclosed Location',
        },
        {
          text: 'London',
        },
        {
          text: 'None of these',
          correct: true,
        },
      ],
    },
    {
      questionText:
        'The five elements of blockchain are distribution, encryption, immutability, tokenization and:',
      answers: [
        {
          text: 'Transparency',
        },
        {
          text: 'Authorization',
        },
        {
          text: 'Efficiency',
        },
        {
          text: 'Decentralization',
          correct: true,
        },
      ],
    },
  ];
}
