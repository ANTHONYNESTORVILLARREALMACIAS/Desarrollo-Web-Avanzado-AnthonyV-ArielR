import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hijo-contador',
  standalone: true,
  templateUrl: './hijo-contador.component.html',
  styleUrls: ['./hijo-contador.component.css'],
})
export class HijoContadorComponent {
  contador: number = 0;

  // Eventos para informar al padre
  @Output() cambioContador = new EventEmitter<number>();

  incrementar() {
    this.contador++;
    this.cambioContador.emit(this.contador);
  }

  decrementar() {
    this.contador--;
    this.cambioContador.emit(this.contador);
  }
}
