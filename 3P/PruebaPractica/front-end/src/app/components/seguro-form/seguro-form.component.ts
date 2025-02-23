import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../../services/seguro.service';
import { SeguroDTO } from '../../interface/seguro-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutomovilService } from '../../services/automovil.service';
import { AutomovilDTO } from '../../interface/automovil-dto';

@Component({
  selector: 'app-seguro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './seguro-form.component.html',
  styleUrls: ['./seguro-form.component.css']
})
export class SeguroFormComponent implements OnInit {
  editando = false;
  automoviles: AutomovilDTO[] = [];
  form = new FormGroup({
    costoTotal: new FormControl(0, [Validators.required, Validators.min(1)]),
    automovilId: new FormControl<number | null>(null, Validators.required)
  });

  constructor(
    private service: SeguroService,
    private automovilService: AutomovilService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAutomoviles();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.service.obtenerPorId(+id).subscribe(s => {
        this.form.patchValue({
          costoTotal: s.costoTotal,
          automovilId: s.automovilId
        });
      });
    }
  }

  cargarAutomoviles(): void {
    this.automovilService.obtenerTodos().subscribe(data => this.automoviles = data);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dto: SeguroDTO = {
        ...this.form.value,
        id: this.editando ? +this.route.snapshot.params['id'] : undefined
      } as SeguroDTO;

      const operation = this.editando
        ? this.service.modificar(dto.id!, dto)
        : this.service.crear(dto);

      operation.subscribe(() => this.router.navigate(['/seguros']));
    }
  }
}
