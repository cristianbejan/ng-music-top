import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent implements OnInit, OnChanges, DoCheck {
  songs: Song[] = [];
  searchValue: string;
  isReset: boolean = false;
  nothingFound: boolean = false;

  @Input() newSong!: Song;
  @ViewChild('list', { static: true }) list!: ElementRef;

  constructor(
    private songService: SongService,
    private dataService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getSongs();
    this.dataService.currentFilterValue.subscribe(
      (value) => (this.searchValue = value)
    );
    this.dataService.getResetFilterState.subscribe(
      (bool) => (this.isReset = bool)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newSongValue: Song = changes['newSong'].currentValue;
    let songInArr: boolean = false;

    for (const song of this.songs) {
      if (song.id == newSongValue.id) {
        songInArr = true;
      }
    }

    if (songInArr) {
      this.songService
        .updateSong(newSongValue, newSongValue.id)
        .subscribe(() => {
          this.getSongs();
        });
    } else if (newSongValue) {
      this.songService.addNewSong(newSongValue).subscribe(() => {
        this.getSongs();
        this._scrollToEnd();
      });
    }
  }

  ngDoCheck() {
    if (this.searchValue) {
      this.searchSong();
    }
    if (this.isReset) {
      this.getSongs();
      this.dataService.resetFilterState(false);
      this.nothingFound = false;
    }
  }

  getSongs(): void {
    this.songService.getSongs().subscribe((songs) => {
      this.songs = songs.sort((a, b) => {
        if (a.votes === b.votes) {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          return dateB > dateA ? 1 : -1;
        } else {
          return b.votes - a.votes;
        }
      });
    });
  }

  onSongVote(song: Song): void {
    const updatedVotes = song.votes + 1;
    const payload = {
      votes: updatedVotes,
    };

    this.songService.updateVotes(payload, song.id).subscribe(() => {
      this.getSongs();
    });
  }

  onDeleteSong(song: Song): void {
    if (confirm('Are you sure?')) {
      this.songService.deleteSong(song.id).subscribe(() => {
        this.getSongs();
      });
    }
  }

  private _scrollToEnd() {
    this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
  }

  searchSong(): void {
    let filteredSongs: Song[] = [];

    for (const key in this.songs) {
      if (
        this.songs[key].name.toLowerCase().includes(this.searchValue) ||
        this.songs[key].artist.toLowerCase().includes(this.searchValue)
      ) {
        filteredSongs.push(this.songs[key]);
      } else {
        this.nothingFound = true;
      }
    }

    this.songs = filteredSongs;
  }
}
