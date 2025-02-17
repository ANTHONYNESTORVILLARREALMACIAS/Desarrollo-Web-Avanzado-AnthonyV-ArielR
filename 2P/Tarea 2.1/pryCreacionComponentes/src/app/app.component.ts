import { Component } from '@angular/core';
import { PadreCarritoComponent } from './padre-carrito/padre-carrito.component';
import { PadreContadorComponent } from './padre-contador/padre-contador.component';
import { PadreFormularioComponent } from './padre-formulario/padre-formulario.component';
import { PadreGaleriaImagenesComponent } from './padre-galeria-imagenes/padre-galeria-imagenes.component';
import { PadreValidarFormularioComponent } from './padre-validar-formulario/padre-validar-formulario.component';
import { PadreVideoComponent } from './padre-video/padre-video.component';
import { PadreTareasComponent } from './padre-tareas/padre-tareas.component';
import { TarjetaProductoComponent } from './tarjeta-producto/tarjeta-producto.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PadreCarritoComponent,
    PadreContadorComponent,
    PadreFormularioComponent,
    PadreGaleriaImagenesComponent,
    PadreValidarFormularioComponent,
    PadreVideoComponent,
    PadreTareasComponent,
    TarjetaProductoComponent,
    ConfiguracionComponent,
    EncabezadoComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pryCreacionComponentes';
}
