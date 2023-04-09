import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song.interface';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private songToBeEdited$ = new BehaviorSubject<Song>(null);
  selectedSongToBeEdited = this.songToBeEdited$.asObservable();

  private resetingFilter$ = new BehaviorSubject<boolean>(false);
  getResetFilterState = this.resetingFilter$.asObservable();

  private filterValue$ = new BehaviorSubject<string>('');
  currentFilterValue = this.filterValue$.asObservable();

  newSongToBeEdited(song: Song) {
    this.songToBeEdited$.next(song);
  }

  resetFilterState(bool: boolean) {
    this.resetingFilter$.next(bool);
  }

  newFilterValue(value: string) {
    this.filterValue$.next(value);
  }
}
