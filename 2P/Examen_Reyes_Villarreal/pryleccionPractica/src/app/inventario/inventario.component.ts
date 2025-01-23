import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../services/product';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent {
  productos: Producto[] = [];
  producto: Producto = { id: 0, nombre: '', categoria: '', precio: 0, stock: 0 };
  showDialog = false;
  mensajeError: string = '';

  categorias = ['Electrónica', 'Muebles', 'Ropa'];

  constructor(private inventarioService: InventarioService) {
    // Recuperar productos del localStorage al iniciar la aplicación
    this.productos = this.inventarioService.obtenerProductos();
  }

  mostrarDialogoAgregar() {
    this.producto = { id: 0, nombre: '', categoria: '', precio: 0, stock: 0 };
    this.mensajeError = '';  // Limpiar mensaje de error
    this.showDialog = true;
  }

  editarProducto(producto: Producto) {
    this.producto = { ...producto };
    this.mensajeError = '';  // Limpiar mensaje de error
    this.showDialog = true;
  }

  eliminarProducto(id: number) {
    this.productos = this.inventarioService.eliminarProducto(this.productos, id);
    // Guardar los productos actualizados en localStorage
    this.inventarioService.guardarProductos(this.productos);
  }

  guardarProducto() {
    // Validar que el nombre del producto no esté repetido
    const existeProducto = this.inventarioService.validarProductoExistente(
      this.productos,
      this.producto.nombre
    );

    if (existeProducto) {
      this.mensajeError = 'Ya existe un producto con ese nombre. Elige otro nombre.';
      return;
    }

    // Agregar o actualizar producto
    this.productos = this.inventarioService.guardarProducto(this.productos, this.producto);

    // Guardar los productos actualizados en localStorage
    this.inventarioService.guardarProductos(this.productos);
    this.showDialog = false;
  }

  cerrarDialogo() {
    this.showDialog = false;
  }
}
