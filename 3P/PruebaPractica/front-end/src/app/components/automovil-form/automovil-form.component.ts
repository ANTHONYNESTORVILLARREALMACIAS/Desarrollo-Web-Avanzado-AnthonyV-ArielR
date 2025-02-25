import { Component, OnInit } from '@angular/core';
import { AutomovilService } from '../../services/automovil.service';
import { AutomovilDTO } from '../../interface/automovil-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { PropietarioDTO } from '../../interface/propietario-dto';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-automovil-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './automovil-form.component.html',
  styleUrls: ['./automovil-form.component.css']
})
export class AutomovilFormComponent implements OnInit {
  editando = false;
  propietarios: PropietarioDTO[] = [];
  form = new FormGroup({
    modelo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    valor: new FormControl(0, [Validators.required, Validators.min(1)]),
    accidentes: new FormControl(0, [Validators.required, Validators.min(0)]),
    propietarioId: new FormControl<number | null>(null, Validators.required)
  });

  constructor(
    private service: AutomovilService,
    private propietarioService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPropietarios();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.service.obtenerPorId(+id).subscribe({
        next: (a) => this.form.patchValue({
          modelo: a.modelo,
          valor: a.valor,
          accidentes: a.accidentes,
          propietarioId: a.propietarioId
        }),
        error: (err) => console.error('Error cargando automóvil:', err)
      });
    }
  }

  cargarPropietarios(): void {
    this.propietarioService.getAll().subscribe({
      next: (data) => this.propietarios = data,
      error: (err) => console.error('Error cargando propietarios:', err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dto: AutomovilDTO = {
        ...this.form.value,
        id: this.editando ? +this.route.snapshot.params['id'] : undefined
      } as AutomovilDTO;

      const operation = this.editando
        ? this.service.modificar(dto.id!, dto)
        : this.service.crear(dto);

      operation.subscribe({
        next: () => this.router.navigate(['/automoviles']),
        error: (err) => console.error('Error guardando automóvil:', err)
      });
    }
  }
}
