import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '@app/models/auth.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  constructor() { }

  login(body: Login): Observable<any> {
    return this.http.post(`${environment.urlBase}/login`, body);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Devuelve true si hay un token
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${environment.urlBase}/logout`);
  }

  register(body: any): Observable<any> {
    return this.http.post(`${environment.urlBase}/registro`, body);
  }

}
