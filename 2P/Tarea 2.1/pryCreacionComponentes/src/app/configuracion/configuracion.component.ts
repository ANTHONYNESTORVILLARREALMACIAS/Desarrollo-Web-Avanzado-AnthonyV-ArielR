import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from '../contenido/contenido.component';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, ContenidoComponent],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent {
  config = { idioma: 'es', tema: 'oscuro' };

  actualizarConfig(nuevaConfig: { idioma: string; tema: string }) {
    this.config = nuevaConfig; // Actualiza la configuración en el padre
  }
}
