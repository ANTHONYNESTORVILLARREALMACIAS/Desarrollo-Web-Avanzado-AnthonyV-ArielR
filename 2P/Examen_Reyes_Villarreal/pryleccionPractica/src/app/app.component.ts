import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}

  irAInventario() {
    this.router.navigate(['/inventario']);
  }

  irAInicio() {
    this.router.navigate(['/']);
  }
}
