import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';

export const appRoutes: Routes = [
  { path: '', component: InicioComponent },   // Ruta inicial (pantalla de inicio)
  { path: 'inventario', component: InventarioComponent }, // Ruta al inventario
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Ruta por defecto (redirige a inicio en caso de error 404)
];
