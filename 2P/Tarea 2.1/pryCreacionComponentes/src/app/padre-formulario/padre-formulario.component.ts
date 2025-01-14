import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoFormularioComponent } from '../hijo-formulario/hijo-formulario.component';

@Component({
  selector: 'app-padre-formulario',
  standalone: true,
  imports: [CommonModule, HijoFormularioComponent],
  templateUrl: './padre-formulario.component.html',
  styleUrls: ['./padre-formulario.component.css'],
})
export class PadreFormularioComponent {
  datosRecibidos: { nombre: string; email: string } | null = null;

  // Método que se ejecuta al recibir datos del hijo
  manejarFormulario(datos: { nombre: string; email: string }) {
    this.datosRecibidos = datos;
  }
}
