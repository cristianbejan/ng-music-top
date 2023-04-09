import { Component, OnInit } from '@angular/core';
import { Song } from './interfaces/song.interface';
import {
  faSquarePlus,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { DataStoreService } from './services/data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  faSquarePlus = faSquarePlus;
  faXmarkCircle = faXmarkCircle;
  showForm = false;
  newSongData!: Song;

  constructor(private dataService: DataStoreService) {}

  ngOnInit(): void {
    this.dataService.selectedSongToBeEdited.subscribe((song) => {
      if (song) {
        this.showForm = true;
      }
    });
  }

  onToggleForm(): void {
    this.showForm = !this.showForm;
  }

  onFormSubmit(inputValue: Song): void {
    this.newSongData = inputValue;
    this.onToggleForm();
  }
}
