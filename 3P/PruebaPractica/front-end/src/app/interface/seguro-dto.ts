export interface SeguroDTO {
  id?: number; // Opcional porque no se envía al crear un seguro
  costoTotal: number; // Devuelto por el backend
  automovilId: number; // Enviado al backend
  modeloAutomovil?: string; // Devuelto por el backend
  propietarioNombre?: string; // Devuelto por el backend
}
