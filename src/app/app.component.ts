import { Component } from '@angular/core';
import { Song } from './interfaces/song.interface';
import {
  faSquarePlus,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { SONGS } from './songs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faSquarePlus = faSquarePlus;
  faXmarkCircle = faXmarkCircle;
  showForm = false;
  showBtn = true;
  songs: Song[] = SONGS;

  onToggleForm(): void {
    this.showForm = !this.showForm;
    this.showBtn = !this.showBtn;
  }
}
