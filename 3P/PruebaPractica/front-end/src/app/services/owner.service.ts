import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Esta importación debe existir
import { PropietarioDTO } from '../interface/propietario-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl = 'http://localhost:9090/api/propietarios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PropietarioDTO[]> {
    console.log('Realizando GET a:', this.apiUrl); // <-- Agregar esto
    return this.http.get<PropietarioDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<PropietarioDTO> {
    return this.http.get<PropietarioDTO>(`${this.apiUrl}/${id}`);
  }

  create(propietario: PropietarioDTO): Observable<PropietarioDTO> {
    return this.http.post<PropietarioDTO>(this.apiUrl, propietario);
  }

  update(id: number, propietario: PropietarioDTO): Observable<PropietarioDTO> {
    return this.http.put<PropietarioDTO>(`${this.apiUrl}/${id}`, propietario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
