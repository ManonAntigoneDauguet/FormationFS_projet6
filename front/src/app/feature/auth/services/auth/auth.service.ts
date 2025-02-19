import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/core/interfaces/session-user.interface';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/user';

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<SessionUser> {
    console.log("données envoyées : ", JSON.stringify(loginRequest));
    return this.http.post<SessionUser>(`${this.pathService}/login`, loginRequest, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true });
  }

  public register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.pathService}/register`, registerRequest);
  }
}
