import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { TokenApiResponse } from 'src/app/core/interfaces/token-api-response.interface';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { LoginRequest } from '../../../feature/auth/interfaces/loginRequest.interface';
import { RegisterRequest } from '../../../feature/auth/interfaces/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/user';

  constructor(private http: HttpClient) { }

  /**
   * Logins user
   * @param {LoginRequest} loginRequest 
   * @returns {Observable<User>}
   */
  public login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<TokenApiResponse>(`${this.pathService}/login`, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true
    }).pipe(
      switchMap(() => {
        return this.getProfile()
      })
    );
  }

  /**
   * Saves a new user
   * @param {RegisterRequest} registerRequest 
   * @returns {Observable<string>} as validation message
   */
  public register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post(`${this.pathService}/register`, registerRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      withCredentials: true
    });
  }

  /**
   * Get user information
   * @returns {Observable<User>}
   */
  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.pathService}`, { withCredentials: true });
  }

  /**
   * Changes email ou username information
   * @param {RegisterRequest} registerRequest 
   * @returns {Observable<string>} as validation message
   */
  public updateProfile(registerRequest: RegisterRequest): Observable<string> {
    return this.http.put(`${this.pathService}`, registerRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
      withCredentials: true
    });
  }
}
