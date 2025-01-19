import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-inventory-management',
  standalone: true,  // Componente independiente
  imports: [ReactiveFormsModule],  // Importa ReactiveFormsModule
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.css'
})
export class InventoryManagementComponent {
  inventoryForm: FormGroup;
  @Output() productAdded = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addProduct() {
    if (this.inventoryForm.valid) {
      this.productAdded.emit(this.inventoryForm.value);
      this.inventoryForm.reset();
    }
  }
}
