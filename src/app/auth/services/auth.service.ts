import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient, jwtService: JwtService) {}

  login(username: string, password: string) {
    this.http
      .post<any>(`${this.endpoint}/user/login`, { username, password })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
