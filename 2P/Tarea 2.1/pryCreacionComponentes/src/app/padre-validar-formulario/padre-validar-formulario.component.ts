import { Component } from '@angular/core';
import { HijoValidarFormularioComponent } from '../hijo-validar-formulario/hijo-validar-formulario.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-padre-validar-formulario',
  standalone: true,
  imports: [HijoValidarFormularioComponent, CommonModule],
  templateUrl: './padre-validar-formulario.component.html',
  styleUrls: ['./padre-validar-formulario.component.css']
})
export class PadreValidarFormularioComponent {

  mensaje: string = '';

  // Este método maneja el evento de validación del formulario
  onValidarFormulario(validado: boolean) {
    if (validado) {
      this.mensaje = "Datos correctamente ingresados";  // Asignar el mensaje
    } else {
      this.mensaje = "Formulario no válido";
    }
  }
}
