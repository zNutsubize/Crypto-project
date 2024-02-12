import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(private http: HttpClient) {}

  usersUrl: string = 'http://localhost:3000/users';

  public user: User = {
    email: '',
    password: '',
    age: 0,
    phone: 0,
    gender: 'male',
    watchlist: [],
    id: 0,
  };

  public email: string = '';
  public userId: number = 0;

  postUsers(data: User): Observable<User[]> {
    return this.http.post(this.usersUrl, data) as Observable<User[]>;
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl) as Observable<User[]>;
  }

  update(data: any, id: number): Observable<User[]> {
    return this.http.put(this.usersUrl + '/' + id, data) as Observable<User[]>;
  }
}
