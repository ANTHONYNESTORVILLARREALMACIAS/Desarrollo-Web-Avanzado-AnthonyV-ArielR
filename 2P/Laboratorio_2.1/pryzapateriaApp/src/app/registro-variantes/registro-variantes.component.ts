import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto, productos } from '../producto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-variantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-variantes.component.html',
  styleUrls: ['./registro-variantes.component.css']
})
export class RegistroVariantesComponent implements OnInit {
  registroForm: FormGroup;
  productos: Producto[] = productos;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      colores: [[], Validators.required], // Arreglo vacío por defecto
      tallas: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  registrarZapato(): void {
    if (this.registroForm.invalid) {
      return;
    }

    const nuevoZapato: Producto = this.registroForm.value;
    this.productos.push(nuevoZapato);
    this.registroForm.reset();
  }
}
