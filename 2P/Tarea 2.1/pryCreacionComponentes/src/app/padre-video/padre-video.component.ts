import { Component, ViewChild } from '@angular/core';
import { HijoVideoComponent } from '../hijo-video/hijo-video.component';

@Component({
  selector: 'app-padre-video',
  standalone: true,
  templateUrl: './padre-video.component.html',
  styleUrls: ['./padre-video.component.css'],
  imports: [HijoVideoComponent],
})
export class PadreVideoComponent {
  @ViewChild(HijoVideoComponent) hijoVideo!: HijoVideoComponent;

  reproducirVideo() {
    this.hijoVideo.reproducir();
  }

  pausarVideo() {
    this.hijoVideo.pausar();
  }
}
