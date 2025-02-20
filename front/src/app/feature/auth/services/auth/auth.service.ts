import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenApiResponse } from 'src/app/core/interfaces/token-api-response.interface';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/user';

  constructor(private http: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<TokenApiResponse> {
    return this.http.post<TokenApiResponse>(`${this.pathService}/login`, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true
    });
  }

  public register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post(`${this.pathService}/register`, registerRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      withCredentials: true
    });
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(
      `${this.pathService}`,
      { withCredentials: true }
    );
  }
}
