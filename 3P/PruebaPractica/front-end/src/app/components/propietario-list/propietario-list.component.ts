import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { PropietarioDTO } from '../../interface/propietario-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-propietario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './propietario-list.component.html',
  styleUrls: ['./propietario-list.component.css']
})
export class PropietarioListComponent implements OnInit {
  propietarios: PropietarioDTO[] = [];

  constructor(private service: OwnerService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.getAll().subscribe(data => this.propietarios = data);
  }

  eliminar(id: number): void {
    if(confirm('¿Estás seguro de eliminar este propietario?')) {
      this.service.delete(id).subscribe(() => this.cargarDatos());
    }
  }
}
