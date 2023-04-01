import { Component, Input } from '@angular/core';
import {
  faMusic,
  faXmark,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Song } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent {
  faMusic = faMusic;
  faXmark = faXmark;
  faPenToSquare = faPenToSquare;

  @Input() song?: Song;
  @Input() index?: number;
}
