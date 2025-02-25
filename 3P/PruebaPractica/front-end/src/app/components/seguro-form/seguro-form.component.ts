import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../../services/seguro.service';
import { SeguroDTO } from '../../interface/seguro-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutomovilService } from '../../services/automovil.service';
import { AutomovilDTO } from '../../interface/automovil-dto';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-seguro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './seguro-form.component.html',
  styleUrls: ['./seguro-form.component.css']
})
export class SeguroFormComponent implements OnInit {
  editando = false;
  automoviles: AutomovilDTO[] = [];
  seguroGenerado?: SeguroDTO;
  mostrarResultado = false;
  costoCalculado: number | null = null;
  originalAutomovilId: number | null = null;
  mostrarSinCambios = false;

  form = new FormGroup({
    automovilId: new FormControl<number | null>(null, Validators.required)
  });

  constructor(
    private seguroService: SeguroService,
    private automovilService: AutomovilService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAutomoviles();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.seguroService.obtenerPorId(+id).subscribe({
        next: (seguro) => {
          this.originalAutomovilId = seguro.automovilId;
          this.costoCalculado = seguro.costoTotal; // Cargar el costo actual
          this.form.patchValue({
            automovilId: seguro.automovilId
          });
        },
        error: (err) => console.error('Error cargando seguro:', err)
      });
    }
  }

  cargarAutomoviles(): void {
    this.automovilService.obtenerTodos().subscribe({
      next: (data) => {
        this.automoviles = data.filter(a => a.propietarioId !== null && a.propietarioId !== undefined);
      },
      error: (err) => console.error('Error cargando automóviles:', err)
    });
  }

  onAutomovilSeleccionado(event: Event): void {
    const automovilId = +(event.target as HTMLSelectElement).value;
    if (automovilId) {
      this.seguroService.generarSeguro(automovilId).subscribe({
        next: (seguro) => {
          this.costoCalculado = seguro.costoTotal;
        },
        error: (err) => {
          console.error('Error generando seguro:', err);
          this.costoCalculado = null;
        }
      });
    } else {
      this.costoCalculado = null;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const automovilId = this.form.value.automovilId;

      if (!automovilId) return;

      if (this.editando) {
        if (automovilId === this.originalAutomovilId) {
          this.mostrarSinCambios = true;
          setTimeout(() => this.mostrarSinCambios = false, 3000);
          return;
        }

        const dto: SeguroDTO = {
          id: +this.route.snapshot.params['id'],
          automovilId: automovilId
        } as SeguroDTO;

        this.seguroService.modificar(dto.id!, dto).subscribe({
          next: (seguroActualizado) => {
            this.costoCalculado = seguroActualizado.costoTotal; // Refleja el nuevo costo calculado por el backend
            this.router.navigate(['/seguros']); // Navega de vuelta a la lista
          },
          error: (err) => console.error('Error actualizando seguro:', err)
        });
      } else {
        if (this.costoCalculado === null) return;

        this.seguroService.generarSeguro(automovilId).subscribe({
          next: (seguroCreado) => {
            this.seguroGenerado = seguroCreado;
            this.mostrarResultado = true;
            setTimeout(() => this.router.navigate(['/seguros']), 3000);
          },
          error: (err) => console.error('Error generando seguro:', err)
        });
      }
    }
  }
}
