import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginAuthService } from 'src/app/shared/services/login-auth.service';
import { UsersApiService } from 'src/app/shared/services/users-api.service';
import { User } from 'src/app/shared/interfaces/user-interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup<object>({});

  constructor(
    private http: UsersApiService,
    private loginAuth: LoginAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  public logIn(): void {
    this.http
      .getUsers()
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
          const user = res.find((a: User) => {
            let email = this.formGroup.value.email;
            return (
              a.email === email.toLowerCase() &&
              a.password === this.formGroup.value.password
            );
          });
          if (user) {
            alert('Login Successful!');
            this.http.user = user;
            this.formGroup.reset();
            this.loginAuth.isLoggedIn$.next(true);
            this.loginAuth.isLoggedInAppearance$.next(false);
            this.loginAuth.isLoggedIn = true;
            this.router.navigate(['dashboard']);
          } else {
            alert('user not found!');
          }
        }
      });
  }
}
