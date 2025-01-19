import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../app.component';

@Component({
  selector: 'app-product-variants',
  standalone: true,  // Componente independiente
  imports: [ReactiveFormsModule, CommonModule],  // Importar ReactiveFormsModule aquí
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.css'
})
export class ProductVariantsComponent {
  variantForm: FormGroup;
  @Input() products: Product[] = [];
  @Output() variantsUpdated = new EventEmitter<Product[]>();  // Emisor para actualizar variantes

  colors = ['Rojo', 'Azul', 'Negro', 'Blanco'];
  sizes = ['S', 'M', 'L', 'XL'];

  constructor(private fb: FormBuilder) {
    this.variantForm = this.fb.group({
      productName: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    if (this.variantForm.valid) {
      const { productName, color, size, price } = this.variantForm.value;

      // Buscar el producto que corresponde al nombre proporcionado
      const selectedProduct = this.products.find(p => p.productName === productName);
      if (selectedProduct) {
        // Agregar la variante al producto seleccionado
        const newVariant = { color, size, price };
        if (!selectedProduct.variants) {
          selectedProduct.variants = [];
        }
        selectedProduct.variants.push(newVariant);

        // Emitir el producto actualizado para reflejar la nueva variante
        this.variantsUpdated.emit(this.products);  // Emitir los productos actualizados
      }

      this.variantForm.reset();  // Limpiar el formulario después de enviar
    }
  }
}
