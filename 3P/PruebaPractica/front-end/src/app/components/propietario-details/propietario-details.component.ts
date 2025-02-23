import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { PropietarioDTO } from '../../interface/propietario-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Agregar esto

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Agregar HttpClientModule
  templateUrl: './propietario-details.component.html',
  styleUrls: ['./propietario-details.component.css']
})
export class PropietarioDetailsComponent implements OnInit {
  propietario?: PropietarioDTO;

  constructor(
    private service: OwnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getById(+id).subscribe(p => this.propietario = p);
  }
}
