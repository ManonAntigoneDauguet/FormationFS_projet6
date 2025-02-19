import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUser } from '../../interfaces/session-user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  private TOKEN_KEY = 'token';
  public isLogged: boolean = !!localStorage.getItem('token');
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor() { }

  public isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null ? token : null;
  }

  public login(user: SessionUser): void {
    this.isLogged = true;
    localStorage.setItem(this.TOKEN_KEY, user.token);
    this.next();
  }

  public logout(): void {
    this.isLogged = false;
    localStorage.removeItem(this.TOKEN_KEY);
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
