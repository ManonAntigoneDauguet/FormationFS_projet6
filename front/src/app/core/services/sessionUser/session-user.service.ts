import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionUser } from '../../interfaces/session-user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {

  public isLogged = false;
  public sessionUser: SessionUser | undefined;
  
  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor() { }

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public login(user: SessionUser): void {
    this.sessionUser = user;
    this.isLogged = true;
    this.next();
  }

  public logout(): void {
    this.sessionUser = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
