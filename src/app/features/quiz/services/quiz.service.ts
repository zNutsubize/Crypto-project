import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  public hasStarted: boolean = false;

  public getStartStatus(): boolean {
    return this.hasStarted;
  }
}
