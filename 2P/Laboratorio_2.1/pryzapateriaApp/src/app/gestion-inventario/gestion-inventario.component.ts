import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto, productos } from '../producto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.css']
})
export class GestionInventarioComponent implements OnInit {
  productos: Producto[] = productos;  // Usar los productos importados
  productoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      colores: [[], Validators.required],  // Ahora es un arreglo vacío por defecto
      tallas: [[], Validators.required],   // Ahora es un arreglo vacío por defecto
      marca: ['', Validators.required],
      precioUnitario: ['', [Validators.required, Validators.min(1)]],
      stockInicial: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Los productos ya están disponibles
  }

  agregarProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const nuevoProducto: Producto = this.productoForm.value;
    nuevoProducto.stockActual = nuevoProducto.stockInicial; // Inicializar el stock actual igual al stock inicial
    this.productos.push(nuevoProducto); // Agregar el producto al array
    this.productoForm.reset(); // Limpiar el formulario
  }
}
