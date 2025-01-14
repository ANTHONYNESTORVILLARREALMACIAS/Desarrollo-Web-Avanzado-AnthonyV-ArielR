import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent {
  @Input() config: { idioma: string; tema: string } = { idioma: 'es', tema: 'claro' };
  @Output() configChange = new EventEmitter<{ idioma: string; tema: string }>();

  cambiarIdioma() {
    this.config.idioma = this.config.idioma === 'es' ? 'en' : 'es';
    this.configChange.emit({ ...this.config });
  }

  cambiarTema() {
    this.config.tema = this.config.tema === 'claro' ? 'oscuro' : 'claro';
    this.configChange.emit({ ...this.config });
  }
}
