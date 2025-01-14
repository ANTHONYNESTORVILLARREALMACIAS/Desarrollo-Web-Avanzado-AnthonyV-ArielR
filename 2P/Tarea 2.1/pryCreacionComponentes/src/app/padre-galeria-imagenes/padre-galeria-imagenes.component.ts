import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoGaleriaImagenesComponent } from '../hijo-galeria-imagenes/hijo-galeria-imagenes.component';

@Component({
  selector: 'app-padre-galeria-imagenes',
  standalone: true,
  imports: [CommonModule, HijoGaleriaImagenesComponent],
  templateUrl: './padre-galeria-imagenes.component.html',
  styleUrls: ['./padre-galeria-imagenes.component.css']
})
export class PadreGaleriaImagenesComponent {

}
