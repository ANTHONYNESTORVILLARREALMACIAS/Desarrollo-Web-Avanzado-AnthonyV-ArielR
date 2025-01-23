import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../services/product';
import { InventarioService } from '../services/inventario.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './inventario.component.html',
})
export class InventarioComponent {
  productos: Producto[] = [];
  producto: Producto = { id: 0, nombre: '', categoria: '', precio: 0, stock: 0 };
  showDialog = false;
  mensajeError: string = '';
  searchText: string = '';

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
    // Validar que el nombre del producto no esté repetido si es un producto nuevo
    if (this.producto.id === 0) {
      const existeProducto = this.inventarioService.validarProductoExistente(
        this.productos,
        this.producto.nombre
      );

      if (existeProducto) {
        this.mensajeError = 'Ya existe un producto con ese nombre. Elige otro nombre.';
        return;
      }
    }

    // Asegurar que la categoría seleccionada sea un valor válido
    if (!this.categorias.includes(this.producto.categoria)) {
      this.producto.categoria = '';
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

  filtrarProductos() {
    const searchTextLower = this.searchText.toLowerCase();

    if (this.searchText.trim()) {
      this.productos = this.inventarioService.obtenerProductos().filter(producto =>
        producto.nombre.toLowerCase().includes(searchTextLower) ||
        producto.categoria.toLowerCase().includes(searchTextLower)
      );
    } else {
      // Restaurar la lista completa si no hay texto de búsqueda
      this.productos = this.inventarioService.obtenerProductos();
    }
  }

  // Método para vincular el filtrado directamente con el valor del input
  actualizarFiltro(event: any) {
    this.searchText = event.target.value;
    this.filtrarProductos();
  }
}
