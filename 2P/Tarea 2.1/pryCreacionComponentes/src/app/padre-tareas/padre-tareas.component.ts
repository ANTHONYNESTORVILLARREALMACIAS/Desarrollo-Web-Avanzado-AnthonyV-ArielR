import { Component } from '@angular/core';
import { ListaTareasComponent } from '../lista-tareas/lista-tareas.component';

@Component({
  selector: 'app-padre-tareas',
  standalone: true,
  imports: [ListaTareasComponent],
  templateUrl: './padre-tareas.component.html',
  styleUrls: ['./padre-tareas.component.css']
})
export class PadreTareasComponent {
  tareas: string[] = ['Estudiar Angular', 'Terminar proyecto', 'Leer documentación'];
}
