import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  constructor(private router: Router) {}

  irAInventario() {
    this.router.navigate(['/inventario']);
  }
}
