import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { PropietarioDTO } from '../../interface/propietario-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Agregar esto

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule], // Agregar ReactiveFormsModule y HttpClientModule
  templateUrl: './propietario-form.component.html',
  styleUrls: ['./propietario-form.component.css']
})
export class PropietarioFormComponent implements OnInit {
  editando = false;
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    edad: new FormControl(18, [Validators.required, Validators.min(18)])
  });

  constructor(
    private service: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.service.getById(+id).subscribe(p => {
        const [nombre, apellido] = p.nombreCompleto.split(' ');
        this.form.patchValue({
          nombre,
          apellido,
          edad: p.edad
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const nombre = this.form.value.nombre?.trim() || '';
      const apellido = this.form.value.apellido?.trim() || '';

      const dto: PropietarioDTO = {
        id: this.editando ? +this.route.snapshot.params['id'] : undefined,
        nombreCompleto: `${nombre} ${apellido}`,
        edad: this.form.value.edad!,
        automovilesIds: []
      };

      const operation = this.editando
        ? this.service.update(dto.id!, dto)
        : this.service.create(dto);

      operation.subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }
}
