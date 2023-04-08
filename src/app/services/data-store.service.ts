import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song.interface';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private songToBeEdited$ = new BehaviorSubject<Song>(null);
  selectedSongToBeEdited = this.songToBeEdited$.asObservable();

  private resetingForm$ = new BehaviorSubject<boolean>(false);
  resetForm = this.resetingForm$.asObservable();

  newSongToBeEdited(song: Song) {
    this.songToBeEdited$.next(song);
  }

  isResetForm(bool: boolean) {
    this.resetingForm$.next(bool);
  }
}
