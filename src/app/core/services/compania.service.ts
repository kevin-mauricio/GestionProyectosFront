import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {
  private http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${environment.urlBase}/companias`);
  }
}
