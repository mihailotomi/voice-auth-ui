import { Injectable, computed, signal, Signal } from '@angular/core';
import { TokenType } from '../enums/token-type';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

interface DecodedJwt {
  type: TokenType;
  sub: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  token = signal<string>('');
  decodedToken: Signal<DecodedJwt | null>;

  constructor(private storageService: LocalStorageService) {
    this.checkForToken();
    this.decodedToken = computed(() =>
      this.token() ? jwt_decode<DecodedJwt>(this.token()) : null
    );
  }

  destroyToken() {
    this.storageService.remove('token');
    this.token.update(() => '');
  }

  setToken(token: string) {
    this.storageService.set('token', token);
    this.token.update(() => token);
  }

  private checkForToken() {
    if (!this.token() && this.storageService.get('token')) {
      this.token.update(() => this.storageService.get('token') as string);
    } else {
      this.destroyToken();
    }
  }

  getToken() {
    this.checkForToken();
    return this.token();
  }

  isTokenExpired(): boolean {
    const expTime = this.decodedToken()?.exp;
    let expired: boolean = true;
    if (expTime) {
      expired = 1000 * expTime - new Date().getTime() < 5000;
    }
    return expired;
  }
}
