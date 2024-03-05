import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export type Movie = {
  id: number;
  title: string;
  rating: number;
  releaseDate: Date;
  duration: string;
  pegi: number;
  director: Director;
  genres: Genre[];
};

export enum Genre {
  Anime = 'Anime',
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Horror = 'Horror',
  Romance = 'Romance',
  ScienceFiction = 'Science fiction',
}

export type Director = {
  id: string;
  fullname: string;
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this._httpClient.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  getMovie(id:number): Observable<Movie> {
    return this._httpClient.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }
}
