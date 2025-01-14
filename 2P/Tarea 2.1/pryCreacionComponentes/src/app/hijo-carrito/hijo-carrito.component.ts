import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hijo-carrito',
  standalone: true,
  imports: [CommonModule], // Importa el módulo necesario para usar *ngFor
  templateUrl: './hijo-carrito.component.html',
  styleUrls: ['./hijo-carrito.component.css'],
})
export class HijoCarritoComponent {
  items = [
    { nombre: 'Producto 1', precio: 10 },
    { nombre: 'Producto 2', precio: 20 },
    { nombre: 'Producto 3', precio: 15 },
  ];

  calcularTotal(): number {
    return this.items.reduce((total, item) => total + item.precio, 0);
  }
}
