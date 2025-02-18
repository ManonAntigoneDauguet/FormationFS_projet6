import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/core/interfaces/session-user.interface';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<SessionUser> {
    return this.http.post<SessionUser>(`${this.pathService}/login`, loginRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.pathService}/register`, registerRequest);
  }
}
