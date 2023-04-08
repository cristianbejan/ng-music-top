import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faMusic,
  faXmark,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Song } from 'src/app/interfaces/song.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent {
  faMusic = faMusic;
  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  songToBeEdited: Song = null;

  @Input() song!: Song;
  @Input() index!: number;

  @Output() songVoted: EventEmitter<Song> = new EventEmitter();
  @Output() songDeleted: EventEmitter<Song> = new EventEmitter();
  // @Output() songToEdit: EventEmitter<Song> = new EventEmitter();

  constructor(private dataService: DataStoreService) {}

  onVote(): void {
    this.songVoted.emit(this.song);
  }

  onDelete(): void {
    this.songDeleted.emit(this.song);
  }

  editSong(song: Song): void {
    this.songToBeEdited = song;
    this.dataService.newSongToBeEdited(this.songToBeEdited);
  }
}
