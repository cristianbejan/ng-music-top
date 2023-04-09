import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Song } from 'src/app/interfaces/song.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

enum BTN_TEXT {
  ADD = 'Add song',
  EDIT = 'Save changes',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  btnText: string;
  songToBeEdited: Song = null;
  @Output() formInputData: EventEmitter<Song> = new EventEmitter();

  songForm = new FormGroup({
    song: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
  });

  constructor(private dataService: DataStoreService) {}

  ngOnInit(): void {
    this.dataService.selectedSongToBeEdited.subscribe((song) => {
      if (song) {
        this.songToBeEdited = song;
        this.btnText = BTN_TEXT.EDIT;

        this.songForm.patchValue({
          song: song.name,
          artist: song.artist,
        });
      } else {
        this.btnText = BTN_TEXT.ADD;
      }
    });
  }

  onSubmit(): void {
    let songData: Song = null;

    if (this.songToBeEdited) {
      songData = {
        name: this.songForm.value.song,
        artist: this.songForm.value.artist,
        votes: this.songToBeEdited.votes,
        date: this.songToBeEdited.date,
        id: this.songToBeEdited.id,
      };
    } else {
      songData = {
        name: this.songForm.value.song,
        artist: this.songForm.value.artist,
        votes: 0,
        date: new Date().toLocaleString('en-GB'),
        id: Math.floor(Math.random() * Date.now()),
      };
    }

    this.formInputData.emit(songData);
    this.dataService.newSongToBeEdited(null);
    this.btnText = BTN_TEXT.ADD;
    this.songForm.reset();
  }
}
