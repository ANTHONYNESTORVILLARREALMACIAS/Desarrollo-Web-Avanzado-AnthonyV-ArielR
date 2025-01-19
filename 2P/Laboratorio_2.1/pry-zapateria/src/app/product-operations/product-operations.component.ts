import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../app.component';

@Component({
  selector: 'app-product-operations',
  standalone: true,  // Componente independiente
  imports: [ReactiveFormsModule, CommonModule],  // Importar ReactiveFormsModule y CommonModule
  templateUrl: './product-operations.component.html',
  styleUrl: './product-operations.component.css'
})
export class ProductOperationsComponent {
  operationForm: FormGroup;
  @Input() products: Product[] = [];
  stock: number = 0;
  @Output() stockUpdated = new EventEmitter<Product>();  // Emisor para actualizar el stock

  constructor(private fb: FormBuilder) {
    this.operationForm = this.fb.group({
      product: ['', Validators.required],
      operationType: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.operationForm.valid) {
      const { product, operationType, quantity } = this.operationForm.value;
      const selectedProduct = this.products.find(p => p.productName === product);

      if (selectedProduct) {
        // Aquí actualizamos el stock en el producto seleccionado
        if (operationType === 'Entrada') {
          selectedProduct.stock += quantity;
        } else if (operationType === 'Salida' && selectedProduct.stock >= quantity) {
          selectedProduct.stock -= quantity;
        }

        // Emitir el producto actualizado al componente padre
        this.stockUpdated.emit(selectedProduct);

        console.log(`Producto: ${product}, Operación: ${operationType}, Cantidad: ${quantity}, Nuevo stock: ${selectedProduct!.stock}`);

      }else {
        alert('Producto no encontrado');
      }
      console.log(`Pasd`);
      this.operationForm.reset();
    }
  }
}

