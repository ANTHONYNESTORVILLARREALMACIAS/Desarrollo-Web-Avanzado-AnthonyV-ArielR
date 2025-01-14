import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
@Component({
  selector: 'app-hijo-formulario',
  standalone: true,
  imports: [FormsModule], // Incluye FormsModule aquí
  templateUrl: './hijo-formulario.component.html',
  styleUrls: ['./hijo-formulario.component.css'],
})
export class HijoFormularioComponent {
  // Evento para emitir datos al componente padre
  @Output() enviarFormulario = new EventEmitter<{ nombre: string; email: string }>();

  // Variables locales para el formulario
  nombre: string = '';
  email: string = '';

  // Método que se ejecuta al enviar el formulario
  enviarDatos() {
    this.enviarFormulario.emit({ nombre: this.nombre, email: this.email });
  }
}
