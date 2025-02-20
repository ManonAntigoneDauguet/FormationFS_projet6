import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { TokenApiResponse } from '../../interfaces/token-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  private TOKEN_KEY = 'token';
  public isLogged: boolean = !!localStorage.getItem('token');
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() { }

  public isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null ? token : null;
  }

  public getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public login(user: TokenApiResponse): void {
    this.isLogged = true;
    localStorage.setItem(this.TOKEN_KEY, user.token);
    this.isLoggedSubject.next(this.isLogged);
  }

  public logout(): void {
    this.isLogged = false;
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedSubject.next(this.isLogged);
  }

  public loadUser(user: User) {
    this.userSubject.next(user);
  }
}
