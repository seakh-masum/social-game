import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  getToken(): any {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }
}
