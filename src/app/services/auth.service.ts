import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN = 'access_token';
  private isAuthSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private jwtHelper: JwtHelperService) {}

  set isAuth(value: boolean) {
    this.isAuthSubject$.next(value);
  }

  get isAuth(): boolean {
    return this.isAuthSubject$.getValue();
  }

  get isAuth$(): Observable<boolean> {
    return this.isAuthSubject$.pipe(shareReplay(1));
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
      localStorage.removeItem(this.TOKEN);
    }
  }
}
