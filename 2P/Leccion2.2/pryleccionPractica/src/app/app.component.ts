import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formsPlantilla';

  //modelo datos
  cliente={
    nombre:"",
    CIF:"",
    direccion:'',
    grupo:0
  };

  //lista clientess
  clientes = [
    {nombre:'Cliente  1', CIF:'1234567890', direccion:'La casa',grupo:1},
    {nombre:'Cliente  2', CIF:'9876543210', direccion:'La otra casa',grupo:2},
  ];

  hyaRegistro(){
    return this.clientes.length>0;
  }

  borrarRegistros(CIF:string){
    for(let i=0;i<this.clientes.length;i++){
      if(this.clientes[i].CIF == CIF){
        this.clientes.splice(i,1);
        return;
      }
    }
  }

  agregarRegistro(){
    // Validar campos vacíos
    if (this.cliente.nombre === "" || this.cliente.CIF.trim() === "" || this.cliente.direccion === "" || this.cliente.grupo === 0) {
        alert('Por favor complete todos los campos correctamente.');
        return;
    }

    // Validar que el artículo no exista
    for (let i = 0; i < this.clientes.length; i++) {
        if (this.clientes[i].CIF === this.cliente.CIF) {
            alert('El artículo ya existe');
            return;
        }
    }

    // Agregar el artículo a la lista
    this.clientes.push({
        nombre:this.cliente.nombre,
        CIF:this.cliente.CIF,
        direccion:this.cliente.direccion,
        grupo:this.cliente.grupo
    });

    // Limpiar los campos
    this.cliente.nombre = "";
    this.cliente.CIF = "";
    this.cliente.direccion = "";
    this.cliente.grupo = 0;
}


modificar(){
  let encontrado = false;

  // Buscar el artículo en el array
  for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].CIF === this.cliente.CIF) {
          // Modificar el artículo
          this.clientes[i].nombre = this.cliente.nombre;
          this.clientes[i].direccion = this.cliente.direccion;
          this.clientes[i].grupo = this.cliente.grupo;
          encontrado = true;
          break;
      }
  }

  // Si no se encontró el artículo, mostrar un mensaje
  if (!encontrado) {
      alert('El artículo no existe.');
  }
}

  selccioanr(cliente: {nombre:string,CIF:string,direccion:string,grupo:number}){
    this.cliente.nombre = cliente.nombre;
    this.cliente.CIF = cliente.CIF;
    this.cliente.direccion = cliente.direccion;
    this.cliente.grupo = cliente.grupo
  }

}
