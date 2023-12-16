import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  logIn(credentials: Credentials): Observable<any> {
    return this.#http.post('http://localhost:3000/auth/log-in', credentials);
  }
}
