import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerriesComponent } from './berries/berries.component';
import { TropicalesComponent } from './tropicales/tropicales.component';
import { CitricasComponent } from './citricas/citricas.component';
import { FrambuesaComponent } from './berries/frambuesa/frambuesa.component';
import { MoraComponent } from './berries/mora/mora.component';
import { MangoComponent } from './tropicales/mango/mango.component';
import { PapayaComponent } from './tropicales/papaya/papaya.component';
import { LimaComponent } from './citricas/lima/lima.component';
import { LimonComponent } from './citricas/limon/limon.component';
import { HomeComponent } from './home/home.component';
import { FrutasComponent } from './frutas/frutas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio con enlaces
  { path: 'berries', component: BerriesComponent, children: [
      { path: 'frambuesa', component: FrambuesaComponent },
      { path: 'mora', component: MoraComponent },
      { path: 'frutas', component: FrutasComponent }, // Ruta para el CRUD de frutas berries
  ] },
  { path: 'tropicales', component: TropicalesComponent, children: [
      { path: 'mango', component: MangoComponent },
      { path: 'papaya', component: PapayaComponent },
      { path: 'frutas', component: FrutasComponent }, // Ruta para el CRUD de frutas tropicales
  ] },
  { path: 'citricas', component: CitricasComponent, children: [
      { path: 'lima', component: LimaComponent },
      { path: 'limon', component: LimonComponent },
      { path: 'frutas', component: FrutasComponent }, // Ruta para el CRUD de frutas citricas
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
