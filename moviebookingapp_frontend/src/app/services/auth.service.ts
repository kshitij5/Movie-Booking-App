import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLs } from '../_shared/urls';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public isLoginStatus: boolean = false;
  public userRole: boolean = false;
  public customerId: number | undefined;

  getLoginStatus() {
    // return this.isLoginStatus;

    let tokenStr = localStorage.getItem('loginStatus');
    if (tokenStr == null || tokenStr == '' || tokenStr == undefined) {
      return false;
    } else {
      return true;
    }
  }

  setLoginStatus(status: any) {
    this.isLoginStatus = status;
    localStorage.setItem('loginStatus', status);
    return true;
  }

  getUserRole() {
    // return this.userRole;
    return localStorage.getItem('role');
  }

  setUserRole(role: any) {
    this.userRole = role;

    localStorage.setItem('role', role);
  }

  getCustomerId() {
    // return this.customerId;
    
    localStorage.getItem('customerId');
  }

  setCustomerId(id: any) {
    localStorage.setItem('customerId', id);
    this.customerId = id;
  }

  login(emailId: string, password: string): Observable<any> {
    return this.http.post(
      URLs.AUTH_API_BASE_URL + '/login',
      { emailId: emailId, password: password },
      httpOptions
    );
  }

  register(
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    confirmPassword: string,
    contactNumber: string
  ): Observable<any> {
    return this.http.post(
      URLs.AUTH_API_BASE_URL + '/signup',
      {
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword,
        contactNumber,
      },
      httpOptions
    );
  }
}
