import { Component, OnInit } from '@angular/core';
import { AutomovilService } from '../../services/automovil.service';
import { AutomovilDTO } from '../../interface/automovil-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-automovil-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './automovil-details.component.html',
  styleUrls: ['./automovil-details.component.css']
})
export class AutomovilDetailsComponent implements OnInit {
  automovil?: AutomovilDTO;

  constructor(
    private service: AutomovilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.obtenerPorId(+id).subscribe({
      next: (a) => this.automovil = a,
      error: (err) => console.error('Error cargando automóvil:', err)
    });
  }
}
