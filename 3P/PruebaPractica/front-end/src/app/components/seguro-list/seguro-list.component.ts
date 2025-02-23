import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../../services/seguro.service';
import { SeguroDTO } from '../../interface/seguro-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguro-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguro-list.component.html',
  styleUrls: ['./seguro-list.component.css']
})
export class SeguroListComponent implements OnInit {
  seguros: SeguroDTO[] = [];

  constructor(private service: SeguroService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.obtenerTodos().subscribe(data => this.seguros = data);
  }

  eliminar(id: number): void {
    if(confirm('¿Estás seguro de eliminar este seguro?')) {
      this.service.eliminar(id).subscribe(() => this.cargarDatos());
    }
  }
}
