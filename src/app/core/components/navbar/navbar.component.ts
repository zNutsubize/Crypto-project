import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginAuthService } from 'src/app/shared/services/login-auth.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginAuth: LoginAuthService) {}

  ngOnInit(): void {}

  public checkLogin(): BehaviorSubject<boolean> {
    return this.loginAuth.isLoggedIn$;
  }

  public checkLoginAppearance(): BehaviorSubject<boolean> {
    return this.loginAuth.isLoggedInAppearance$;
  }

  public logOut(): void {
    this.loginAuth.isLoggedIn$.next(false);
    this.loginAuth.isLoggedInAppearance$.next(true);
    this.loginAuth.isLoggedIn = false;
  }
}
