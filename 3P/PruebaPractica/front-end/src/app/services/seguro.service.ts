import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeguroDTO } from '../interface/seguro-dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private apiUrl = 'http://localhost:9090/api/seguros';

  constructor(private http: HttpClient) { }

  generarSeguro(automovilId: number): Observable<SeguroDTO> {
    return this.http.post<SeguroDTO>(`${this.apiUrl}/generar/${automovilId}`, {});
  }

  obtenerTodos(): Observable<SeguroDTO[]> {
    return this.http.get<SeguroDTO[]>(this.apiUrl).pipe(
      map((seguros: SeguroDTO[]) => seguros.map(seguro => ({
        ...seguro,
        modeloAutomovil: seguro.modeloAutomovil || 'Sin modelo',
        propietarioNombre: seguro.propietarioNombre || 'Sin propietario'
      }))))
  }

  obtenerPorId(id: number): Observable<SeguroDTO> {
    return this.http.get<SeguroDTO>(`${this.apiUrl}/${id}`).pipe(
      map(seguro => ({
        ...seguro,
        modeloAutomovil: seguro.modeloAutomovil || 'Sin modelo',
        propietarioNombre: seguro.propietarioNombre || 'Sin propietario'
      })))
  }

  crear(seguro: SeguroDTO): Observable<SeguroDTO> {
    return this.http.post<SeguroDTO>(this.apiUrl, seguro);
  }

  modificar(id: number, seguro: SeguroDTO): Observable<SeguroDTO> {
    return this.http.put<SeguroDTO>(`${this.apiUrl}/${id}`, seguro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
