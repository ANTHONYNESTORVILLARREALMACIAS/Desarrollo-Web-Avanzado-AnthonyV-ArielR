import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  constructor(private router: Router) {}

  irAInventario() {
    this.router.navigate(['/inventario']);
  }
}
