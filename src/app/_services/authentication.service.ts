import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private helper = new JwtHelperService();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(this.decodeToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(credentials: Credentials) {
    return this.http.post(`${environment.apiUrl}/auth`, credentials)
      .pipe(
        map((data) => {
          if (data && data['token']) {
            localStorage.setItem(environment.tokenKey, JSON.stringify(data['token']))
            this.currentUserSubject.next(this.decodeToken());
          }
          return this.decodeToken();
        })
      )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(environment.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in']);
  }

  private decodeToken(): User {
    const token = localStorage.getItem(environment.tokenKey);
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      return decodedToken;
    } else {
      return null;
    }
  }
}

export interface Credentials {
  email: string;
  password: string;
}
