import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  constructor() {}

  public isLoggedIn: boolean = false;

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isLoggedInAppearance$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );

  public loggedIn(): boolean {
    return this.isLoggedIn;
  }
}
