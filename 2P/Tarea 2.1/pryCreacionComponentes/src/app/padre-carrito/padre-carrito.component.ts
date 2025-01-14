import { Component, ViewChild } from '@angular/core';
import { HijoCarritoComponent } from '../hijo-carrito/hijo-carrito.component';

@Component({
  selector: 'app-padre-carrito',
  standalone: true,
  templateUrl: './padre-carrito.component.html',
  styleUrls: ['./padre-carrito.component.css'],
  imports: [HijoCarritoComponent],
})
export class PadreCarritoComponent {
  @ViewChild(HijoCarritoComponent) hijoCarrito!: HijoCarritoComponent;

  total: number = 0;

  obtenerTotal() {
    this.total = this.hijoCarrito.calcularTotal();
  }
}
