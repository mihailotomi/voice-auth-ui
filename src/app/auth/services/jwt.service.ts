import { Injectable, computed, signal, Signal } from '@angular/core';
import { TokenType } from '../enums/token-type';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

interface DecodedJwt {
  type: TokenType;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  token = signal<string>('');
  decodedToken: Signal<DecodedJwt | null>;
  tokenType: Signal<TokenType | null>;

  constructor(private storageService: LocalStorageService) {
    this.decodedToken = computed(() =>
      this.token() ? jwt_decode<DecodedJwt>(this.token()) : null
    );
    this.tokenType = computed(() => {
      const decodedToken = this.decodedToken();
      return decodedToken && decodedToken.type ? decodedToken.type : null;
    });
  }

  setToken(token: string) {
    this.storageService.set('token', token);
    this.token.update(() => token);
  }
}
