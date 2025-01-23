import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './product';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor() {}

  // Recuperar productos desde localStorage
  obtenerProductos(): Producto[] {
    const productosGuardados = localStorage.getItem('productos');
    return productosGuardados ? JSON.parse(productosGuardados) : [];
  }

  // Guardar productos en localStorage
  guardarProductos(productos: Producto[]): void {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  // Validar si el nombre de un producto ya existe
  validarProductoExistente(productos: Producto[], nombre: string): boolean {
    return productos.some(
      (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  // Agregar o actualizar un producto
  guardarProducto(productos: Producto[], producto: Producto): Producto[] {
    if (producto.id) {
      // Actualizar producto existente
      const index = productos.findIndex((p) => p.id === producto.id);
      if (index !== -1) {
        productos[index] = { ...producto };
      }
    } else {
      // Agregar nuevo producto
      producto.id = new Date().getTime(); // Usamos el timestamp como ID
      productos.push(producto);
    }
    return productos;
  }

  // Eliminar un producto por ID
  eliminarProducto(productos: Producto[], id: number): Producto[] {
    return productos.filter((producto) => producto.id !== id);
  }
}
