import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {
  constructor(private _http: HttpClient) { }

  getByProject(project_id): Observable<any> {
    return this._http.get<any>(`${environment.urlBase}/proyectos/${project_id}/historias`);
  }

  create(body: any):Observable<any> {
    return this._http.post(`${environment.urlBase}/historias`, body);
  }

}
