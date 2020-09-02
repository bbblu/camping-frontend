import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN = 'access_token';

  constructor(
    private jwtHelper: JwtHelperService
  ) {
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return this.jwtHelper.isTokenExpired(token);
  }

  setToken(value: string): void {
    localStorage.setItem(this.TOKEN, value);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  removeToken(): void {
    const token = this.getToken();
    if (token) {
      localStorage.removeItem(token);
    }
  }

}
