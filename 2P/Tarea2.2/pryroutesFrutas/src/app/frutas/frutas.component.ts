import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Fruta {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-frutas',
  templateUrl: './frutas.component.html',
  styleUrls: ['./frutas.component.css']
})
export class FrutasComponent {
  frutas: Fruta[] = [];
  nuevaFruta: Fruta = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: ''
  };
  editIndex: number | null = null;

  agregarFruta() {
    if (this.editIndex !== null) {
      // Modificar fruta existente
      this.frutas[this.editIndex] = { ...this.nuevaFruta };
      this.editIndex = null;
    } else {
      // Agregar nueva fruta
      this.frutas.push({ ...this.nuevaFruta });
    }
    this.resetFormulario();
  }

  editarFruta(index: number) {
    this.editIndex = index;
    this.nuevaFruta = { ...this.frutas[index] };
  }

  eliminarFruta(index: number) {
    this.frutas.splice(index, 1);
  }

  resetFormulario() {
    this.nuevaFruta = { nombre: '', descripcion: '', precio: 0, imagen: '' };
  }

  // Validador personalizado para nombre (solo letras)
  soloLetras(event: KeyboardEvent) {
    const pattern = /^[A-Za-z\s]*$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
}
