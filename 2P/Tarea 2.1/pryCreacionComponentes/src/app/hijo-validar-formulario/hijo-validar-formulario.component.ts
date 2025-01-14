import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
@Component({
  selector: 'app-hijo-validar-formulario',
  standalone: true,
  imports: [FormsModule],  // Importa FormsModule
  templateUrl: './hijo-validar-formulario.component.html',
  styleUrls: ['./hijo-validar-formulario.component.css']
})
export class HijoValidarFormularioComponent {

  @Output() formularioValido = new EventEmitter<boolean>();
  dato_1: string = '';
  dato_2: string = '';

  // Método para manejar el envío del formulario
  onSubmit(event: Event) {
    event.preventDefault();

    // Validamos si ambos campos están llenos
    if (this.dato_1 && this.dato_2) {
      this.formularioValido.emit(true);  // Emitir validación exitosa
    } else {
      this.formularioValido.emit(false);  // Emitir validación fallida
    }
  }
}
