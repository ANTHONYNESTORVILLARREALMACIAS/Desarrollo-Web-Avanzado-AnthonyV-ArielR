import { Routes } from '@angular/router';
import { PropietarioListComponent } from './components/propietario-list/propietario-list.component';
import { PropietarioFormComponent } from './components/propietario-form/propietario-form.component';
import { PropietarioDetailsComponent } from './components/propietario-details/propietario-details.component';
import { HomeComponent } from './home/home.component';
import { AutomovilListComponent } from './components/automovil-list/automovil-list.component';
import { AutomovilFormComponent } from './components/automovil-form/automovil-form.component';
import { AutomovilDetailsComponent } from './components/automovil-details/automovil-details.component';
import { SeguroListComponent } from './components/seguro-list/seguro-list.component';
import { SeguroFormComponent } from './components/seguro-form/seguro-form.component';
import { SeguroDetailsComponent } from './components/seguro-details/seguro-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'propietarios',
    children: [
      { path: '', component: PropietarioListComponent },
      { path: 'crear', component: PropietarioFormComponent },
      { path: 'editar/:id', component: PropietarioFormComponent },
      { path: 'detalles/:id', component: PropietarioDetailsComponent }
    ]
  },
  {
    path: 'automoviles',
    children: [
      { path: '', component: AutomovilListComponent },
      { path: 'crear', component: AutomovilFormComponent },
      { path: 'editar/:id', component: AutomovilFormComponent },
      { path: 'detalles/:id', component: AutomovilDetailsComponent }
    ]
  },
  {
    path: 'seguros',
    children: [
      { path: '', component: SeguroListComponent },
      { path: 'crear', component: SeguroFormComponent },
      { path: 'editar/:id', component: SeguroFormComponent },
      { path: 'detalles/:id', component: SeguroDetailsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
