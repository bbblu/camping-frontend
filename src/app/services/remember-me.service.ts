import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RememberMeService {

  IS_REMEMBER_ME = 'rememberMe';
  ACCOUNT = 'account';

  constructor() { }

  checkRememberMe(): boolean {
    const isRememberMe = this.getRememberMe();
    if (!isRememberMe || isRememberMe === 'false') {
      return false;
    }

    return true;
  }

  setRememberMe(value: boolean): void {
    const s = value ? 'true' : 'false';
    localStorage.setItem(this.IS_REMEMBER_ME, s);
  }

  getRememberMe(): string | null {
    return localStorage.getItem(this.IS_REMEMBER_ME);
  }

  setAccount(value: string): void {
    if (this.getRememberMe()) {
      localStorage.setItem(this.ACCOUNT, value);
    }
  }

  getAccount(): string | null {
    return localStorage.getItem(this.ACCOUNT);
  }

}
