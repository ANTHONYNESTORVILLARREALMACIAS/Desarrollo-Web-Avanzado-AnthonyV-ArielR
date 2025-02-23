import { Routes } from '@angular/router';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { NotaComponent } from './components/nota/nota.component';

export const routes: Routes = [
  { path: 'estudiantes', component: EstudianteComponent },
  { path: 'notas', component: NotaComponent },
  { path: '', redirectTo: '/estudiantes', pathMatch: 'full' }
];
