import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private pathService = 'api/user';

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.pathService}`);
  }
}
