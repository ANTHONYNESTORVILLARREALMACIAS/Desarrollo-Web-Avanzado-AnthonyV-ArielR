import { Component, OnInit } from '@angular/core';
import { AutomovilService } from '../../services/automovil.service';
import { AutomovilDTO } from '../../interface/automovil-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-automovil-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Añade HttpClientModule
  templateUrl: './automovil-list.component.html',
  styleUrls: ['./automovil-list.component.css']
})
export class AutomovilListComponent implements OnInit {
  automoviles: AutomovilDTO[] = [];

  constructor(private service: AutomovilService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.obtenerTodos().subscribe({
      next: (data) => this.automoviles = data,
      error: (err) => console.error('Error cargando automóviles:', err)
    });
  }

  eliminar(id: number): void {
    if(confirm('¿Estás seguro de eliminar este automóvil?')) {
      this.service.eliminar(id).subscribe({
        next: () => this.cargarDatos(),
        error: (err) => console.error('Error eliminando automóvil:', err)
      });
    }
  }
}
