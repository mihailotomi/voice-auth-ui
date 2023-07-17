import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setJson(key: string, value: Object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  getJson(key: string) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : {};
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
