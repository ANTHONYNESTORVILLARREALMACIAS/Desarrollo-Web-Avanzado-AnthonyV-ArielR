import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent {
  @Input() nombre: string = 'Celular IPHONE 14 PLUS';
  @Input() precio: number = 500;
  @Input() descripcion: string = 'El mejor celular del mercado';
}
