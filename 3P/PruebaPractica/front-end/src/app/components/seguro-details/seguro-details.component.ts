import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../../services/seguro.service';
import { SeguroDTO } from '../../interface/seguro-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seguro-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguro-details.component.html',
  styleUrls: ['./seguro-details.component.css']
})
export class SeguroDetailsComponent implements OnInit {
  seguro?: SeguroDTO;

  constructor(
    private service: SeguroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.obtenerPorId(+id).subscribe(s => this.seguro = s);
  }
}
