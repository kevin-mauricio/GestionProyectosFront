import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proyecto } from '@app/models/proyecto.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${environment.urlBase}/proyectos`); 
  }
}
