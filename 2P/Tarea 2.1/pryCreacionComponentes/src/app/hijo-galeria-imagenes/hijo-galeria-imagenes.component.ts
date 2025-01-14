import { Component } from '@angular/core';

@Component({
  selector: 'app-hijo-galeria-imagenes',
  standalone: true,
  templateUrl: './hijo-galeria-imagenes.component.html',
  styleUrls: ['./hijo-galeria-imagenes.component.css']
})
export class HijoGaleriaImagenesComponent {
  imagenes: string[] = [
    'https://i.pinimg.com/236x/f8/ff/f0/f8fff0d5493da02431a35fbbe45dba4c.jpg',
    'https://i.pinimg.com/originals/63/58/39/6358396d6debfcc3927e46e8cfd7bb88.jpg',
    'https://i.pinimg.com/564x/1d/51/3a/1d513a3806a9228cd543a6afcf0b4e48.jpg'
  ];
  indiceActual: number = 0;

  avanzar() {
    if (this.indiceActual < this.imagenes.length - 1) {
      this.indiceActual++;
    }
  }

  retroceder() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }
}
