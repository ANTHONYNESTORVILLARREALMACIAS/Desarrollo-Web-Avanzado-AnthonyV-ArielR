import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutomovilDTO } from '../interface/automovil-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {
  private apiUrl = 'http://localhost:9090/api/automoviles';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<AutomovilDTO[]> {
    return this.http.get<AutomovilDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<AutomovilDTO> {
    return this.http.get<AutomovilDTO>(`${this.apiUrl}/${id}`);
  }

  crear(automovil: AutomovilDTO): Observable<AutomovilDTO> {
    return this.http.post<AutomovilDTO>(this.apiUrl, automovil);
  }

  modificar(id: number, automovil: AutomovilDTO): Observable<AutomovilDTO> {
    return this.http.put<AutomovilDTO>(`${this.apiUrl}/${id}`, automovil);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
