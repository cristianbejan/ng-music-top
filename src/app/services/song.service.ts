import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../interfaces/song.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SongService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}/songs`);
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/songs/${id}`);
  }

  addNewSong(payload: Song): Observable<Song> {
    return this.http.post<Song>(`${this.baseUrl}/songs`, payload, httpOptions);
  }

  updateSong(payload: Song, id: number): Observable<Song> {
    return this.http.patch<Song>(
      `${this.baseUrl}/songs/${id}`,
      payload,
      httpOptions
    );
  }

  updateVotes(payload: Partial<Song>, id: number): Observable<Song> {
    return this.http.patch<Song>(
      `${this.baseUrl}/songs/${id}`,
      payload,
      httpOptions
    );
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/songs/${id}`);
  }
}
