import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongComponent } from './components/song/song.component';
import { FormComponent } from './components/form/form.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [AppComponent, SongsListComponent, SongComponent, FormComponent, FilterComponent],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
