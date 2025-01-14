import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hijo-video',
  standalone: true,
  templateUrl: './hijo-video.component.html',
  styleUrls: ['./hijo-video.component.css'],
})
export class HijoVideoComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  reproducir() {
    this.videoPlayer.nativeElement.play();
  }

  pausar() {
    this.videoPlayer.nativeElement.pause();
  }
}
