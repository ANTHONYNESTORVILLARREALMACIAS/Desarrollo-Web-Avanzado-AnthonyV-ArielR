import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto, productos } from '../producto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-operacion-entrada-salida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operacion-entrada-salida.component.html',
  styleUrls: ['./operacion-entrada-salida.component.css']
})
export class OperacionEntradaSalidaComponent implements OnInit {

  productoSeleccionado: Producto | undefined;
  cantidad: number = 0;
  operacion: string = '';
  mensaje: string = '';
  operacionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.operacionForm = this.fb.group({
      operacion: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Aquí puedes inicializar productoSeleccionado o cargarlo de un servicio
    // productoSeleccionado = ...;
  }

  realizarOperacion(): void {
    if (!this.productoSeleccionado) {
      this.mensaje = 'Producto no encontrado.';
      return;
    }

    const stockActual = this.productoSeleccionado?.stockActual ?? 0; // Asegurar que nunca sea undefined

    if (this.operacion === 'salida' && this.cantidad > stockActual) {
      this.mensaje = 'La cantidad solicitada excede el stock disponible.';
      return;
    }

    // Lógica de operación
    if (this.operacion === 'entrada') {
      this.productoSeleccionado.stockActual = stockActual + this.cantidad;
      this.mensaje = 'Entrada registrada correctamente.';
    } else if (this.operacion === 'salida') {
      this.productoSeleccionado.stockActual = stockActual - this.cantidad;
      this.mensaje = 'Salida registrada correctamente.';
    } else {
      this.mensaje = 'Operación no válida.';
    }
  }
}
