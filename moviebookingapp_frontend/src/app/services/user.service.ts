import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { URLs } from '../_shared/urls';
import { User } from '../models/user';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user!: Observable<User>;
  localUser!: User;
  private userSubject!: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  // Getting current user value.
  public get userValue(): User {
    return this.userSubject.value;
  }
  async AuthorizeUserLogin(model: User): Promise<Observable<User>> {
    return await this.http.post<User>(URLs.AUTH_API_BASE_URL, model).pipe(
      map((user: User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);

        return user;
      })
    );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null!);
    this.router.navigate(['/home']);
  }

  isAuthenticated() {
    console.log(localStorage.getItem('auth-user'));
    if (
      localStorage.getItem('auth-user') != null ||
      localStorage.getItem('auth-admin') != null
    ) {
      return true;
    } else {
      return false;
    }
  }
}
