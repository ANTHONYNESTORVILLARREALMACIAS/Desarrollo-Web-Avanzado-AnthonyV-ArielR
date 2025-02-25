import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeguroDTO } from '../interface/seguro-dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private apiUrl = 'http://localhost:9090/api/seguros';

  constructor(private http: HttpClient) {}

  getAutomoviles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:9090/api/automoviles');
  }

  calcularCostoSeguro(automovilId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calcular-costo/${automovilId}`);
  }

  generarSeguro(automovilId: number): Observable<SeguroDTO> {
    return this.http.post<SeguroDTO>(`${this.apiUrl}/generar/${automovilId}`, {});
  }

  // Método para obtener todos los seguros
  obtenerTodos(): Observable<SeguroDTO[]> {
    return this.http.get<SeguroDTO[]>(this.apiUrl).pipe(
      map((seguros: SeguroDTO[]) => seguros.map(seguro => ({
        ...seguro,
        modeloAutomovil: seguro.modeloAutomovil || 'Sin modelo',
        propietarioNombre: seguro.propietarioNombre || 'Sin propietario'
      }))));
  }

  // Método para obtener un seguro por su ID
  obtenerPorId(id: number): Observable<SeguroDTO> {
    return this.http.get<SeguroDTO>(`${this.apiUrl}/${id}`).pipe(
      map(seguro => ({
        ...seguro,
        modeloAutomovil: seguro.modeloAutomovil || 'Sin modelo',
        propietarioNombre: seguro.propietarioNombre || 'Sin propietario'
      })))
  }

  // Método para crear un seguro (no se usa en este caso, pero lo dejamos por si es necesario)
  crear(seguro: SeguroDTO): Observable<SeguroDTO> {
    return this.http.post<SeguroDTO>(this.apiUrl, seguro);
  }

  // Método para modificar un seguro y devolver el objeto actualizado
  modificar(id: number, seguro: SeguroDTO): Observable<SeguroDTO> {
    return this.http.put<SeguroDTO>(`${this.apiUrl}/${id}`, seguro);
  }

  // Método para eliminar un seguro
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
