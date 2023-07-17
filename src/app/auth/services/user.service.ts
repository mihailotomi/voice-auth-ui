import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>(`${this.endpoint}/user/profile`, {
      headers,
    });
  }
}
