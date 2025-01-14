import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [CommonModule], // Importar CommonModule
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent {
  @Input() tareas: string[] = [];
}
