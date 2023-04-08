import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongComponent } from './components/song/song.component';
import { FormComponent } from './components/form/form.component';
import { FilterComponent } from './components/filter/filter.component';
import { ButtonComponent } from './components/button/button.component';
import { SongService } from './services/song.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DataStoreService } from './services/data-store.service';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    SongComponent,
    FormComponent,
    FilterComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [SongService, DataStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
