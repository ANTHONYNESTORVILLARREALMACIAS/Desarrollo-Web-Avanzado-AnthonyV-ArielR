import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoContadorComponent } from '../hijo-contador/hijo-contador.component';

@Component({
  selector: 'app-padre-contador',
  standalone: true,
  imports: [CommonModule, HijoContadorComponent],
  templateUrl: './padre-contador.component.html',
  styleUrls: ['./padre-contador.component.css'],
})
export class PadreContadorComponent {
  valorContador: number = 0;

  actualizarContador(valor: number) {
    this.valorContador = valor;
  }
}
