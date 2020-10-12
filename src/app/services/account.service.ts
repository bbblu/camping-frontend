import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountSubject$ = new BehaviorSubject<string>('');

  constructor() {}

  get account(): string {
    return this.accountSubject$.getValue();
  }

  get account$(): Observable<string> {
    return this.accountSubject$.pipe(shareReplay(1));
  }

  set account(value: string) {
    this.accountSubject$.next(value);
  }
}
