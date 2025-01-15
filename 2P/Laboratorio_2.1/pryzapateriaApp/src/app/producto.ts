export interface Producto {
  id: number;
  nombre: string;
  colores: string[];
  tallas: string[];
  marca?: string;
  precioUnitario?: number;
  stockInicial?: number;
  stockActual?: number;
}
export const productos: Producto[] = [];
