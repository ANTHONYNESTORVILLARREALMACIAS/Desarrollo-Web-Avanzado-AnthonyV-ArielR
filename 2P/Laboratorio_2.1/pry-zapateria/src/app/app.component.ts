import { Component } from '@angular/core';
import { ProductOperationsComponent } from './product-operations/product-operations.component';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
export interface Product {
  productName: string;
  brand: string;
  price: number;
  stock: number;
  variants: {
    color: string;
    size: string;
    price: number;
  }[];
}
@Component({
  selector: 'app-root',
  imports: [
    ProductOperationsComponent,
    ProductVariantsComponent,
    InventoryManagementComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products: Product[] = [
    {
      productName: 'Zapato Deportivo',
      brand: 'Nike',
      price: 50,
      stock: 100,
      variants: []
    },
    {
      productName: 'Zapato Formal',
      brand: 'Adidas',
      price: 60,
      stock: 50,
      variants: []
    }
  ];  // Definir el tipo correctamente

  onProductAdded(product: Product) {
    this.products.push(product);
  }

  onVariantsUpdated(updatedProducts: Product[]) {
    this.products = updatedProducts;
  }

  onStockUpdated(updatedProduct: Product) {
    // Encuentra el producto en la lista y actualiza su stock
    const index = this.products.findIndex(p => p.productName === updatedProduct.productName);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }
}
