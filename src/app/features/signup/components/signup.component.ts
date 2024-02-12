import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService } from 'src/app/shared/services/users-api.service';
import { User } from 'src/app/shared/interfaces/user-interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private userApi: UsersApiService, private router: Router) {}

  public formGroup: FormGroup = new FormGroup<object>({});

  public agreementCheck: boolean = true;

  public passwordRegex = '^[a-zA-Z0-9_]*$';
  public numRegex = '^[+][0-9]{12}$';
  public ageRegex = /^[0-9]{0,2}$/;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(this.passwordRegex),
      ]),
      confirm: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(this.passwordRegex),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.pattern(this.ageRegex),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(this.numRegex),
      ]),
      checkbox: new FormControl('', Validators.requiredTrue),
      gender: new FormControl('', Validators.required),
    });
  }

  // CHECKS IF USER AGREES TO THE AGREEMENTS

  public checkbox(e: any): void {
    const pass = this.formGroup?.get('password')?.value;
    const conf = this.formGroup?.get('confirm')?.value;
    if (e.target.checked) {
      if (pass == conf && pass.length > 7 && this.formGroup.valid) {
        this.agreementCheck = false;
      } else {
        this.agreementCheck = true;
      }
    } else {
      this.agreementCheck = true;
    }
    if (
      pass == conf &&
      pass.length > 7 &&
      e.target.checked &&
      this.formGroup.valid
    ) {
      this.agreementCheck = false;
    } else {
      this.agreementCheck = true;
    }
  }

  public userObj: User = {
    email: '',
    password: '',
    phone: 0,
    age: 0,
    gender: 'male',
    watchlist: [],
    id: 0,
  };

  // THIS FUNCTION SIGNS UP THE USER

  public signUp(): void {
    let email = this.formGroup.value.email;
    this.userApi
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
            return a.email === email.toLowerCase();
          });
          if (!user) {
            this.userObj.email = email.toLowerCase();
            this.userObj.password = this.formGroup.value.password;
            this.userObj.phone = this.formGroup.value.phone;
            this.userObj.age = this.formGroup.value.age;
            this.userObj.gender = this.formGroup.value.gender;
            this.userObj.watchlist = [];

            this.userApi.postUsers(this.userObj).subscribe((res) => {
              this.formGroup.reset();
              alert('You have successfully registered!');
              this.router.navigate(['login']);
            });
          } else {
            alert('User with this email address already exists!');
          }
        }
      });
  }
}
