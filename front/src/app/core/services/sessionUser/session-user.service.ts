import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/feature/profile/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  private isLoggedSubject = new BehaviorSubject<boolean>(this.loadLoggedState());
  private userSubject = new BehaviorSubject<User | null>(this.loadUserState());

  constructor() { }

  private loadLoggedState(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }

  private loadUserState(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  public isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public login(user: User): void {
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('user', JSON.stringify(user));

    this.isLoggedSubject.next(true);
    this.userSubject.next(user);
  }

  public logout(): void {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('user');

    this.isLoggedSubject.next(false);
    this.userSubject.next(null);
  }

  public updateUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
