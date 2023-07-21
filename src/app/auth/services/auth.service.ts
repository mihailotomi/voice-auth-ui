import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, effect } from '@angular/core';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { TokenType } from '../enums/token-type';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.endpoint;
  isLoggedIn: Signal<boolean>;

  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private userService: UserService
  ) {
    this.isLoggedIn = computed(() => {
      return (
        !this.jwtService.isTokenExpired() &&
        this.jwtService.decodedToken()?.type === TokenType.REGULAR
      );
    });

    // initial value for currentUser
    if (this.isLoggedIn()) {
      this.currentUser$ = this.userService.getUser(jwtService.token());
    } else {
      this.currentUser$ = of(null);
    }

    effect(() => {
      if (this.isLoggedIn()) {
        this.currentUser$ = this.userService.getUser(jwtService.token());
      }
    });
  }

  login(username: string, password: string) {
    this.http
      .post<{ user: any; token: string }>(`${this.endpoint}/user/login`, {
        username,
        password,
      })
      .subscribe((res: { user: any; token: string }) => {
        this.jwtService.setToken(res.token);
      });
  }

  logout() {
    this.jwtService.destroyToken();
  }

  getRole() {}
}
