import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private _http: HttpClient) { }

  getByHistoriaId(storyId: number): Observable<any> {
    return this._http.get<any>(`${environment.urlBase}/tickets/historia/${storyId}`);
  }

  create(body: any):Observable<any> {
    return this._http.post(`${environment.urlBase}/tickets`, body);
  }
}
