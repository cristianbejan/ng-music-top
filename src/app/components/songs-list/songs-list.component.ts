import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent implements OnInit {
  @Input() songs: Song[] = [];

  sortedSongsArr: Song[] = [];

  ngOnInit(): void {
    this.sortedSongs();
  }

  sortedSongs(): Song[] {
    this.sortedSongsArr = this.songs.sort((a, b) => {
      if (a.votes === b.votes) {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateB > dateA ? 1 : -1;
      } else {
        return b.votes - a.votes;
      }
    });

    return this.sortedSongsArr;
  }
}
