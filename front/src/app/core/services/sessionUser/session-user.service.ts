import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/feature/profile/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  public isLogged: boolean = false;
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() { }

  public isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public login(user: User): void {
    this.isLogged = true;
    this.isLoggedSubject.next(this.isLogged);
    this.userSubject.next(user);
  }

  public logout(): void {
    this.isLogged = false;
    this.isLoggedSubject.next(this.isLogged);
    this.userSubject.next(null);
  }

  public updateUser(user: User) {
    this.userSubject.next(user);
  }
}
