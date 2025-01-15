import { Component } from '@angular/core';
import { OperacionEntradaSalidaComponent } from './operacion-entrada-salida/operacion-entrada-salida.component';
import { GestionInventarioComponent } from './gestion-inventario/gestion-inventario.component';
import { RegistroVariantesComponent } from './registro-variantes/registro-variantes.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OperacionEntradaSalidaComponent,
    GestionInventarioComponent,
    RegistroVariantesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zapatería';
}
