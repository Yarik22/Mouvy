import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre, Movie, PEGI, PaginatedMovies } from '../../types/movie';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Star } from '../../types/star';
import { Director } from '../../types/director';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = environment.apiUrl;
  private readonly authToken = this._cookieService.get('authToken');
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${this.authToken}`,
  });
  constructor(
    private readonly _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}

  getMovies(
    page: number,
    limit: number,
    genres?: Genre[],
    pegi?: PEGI[],
    rating?: number
  ): Observable<PaginatedMovies> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (genres) {
      params = params.set('genres', genres.join(','));
    }
    if (pegi) {
      params = params.set('pegi', pegi.join(','));
    }
    if (rating) {
      params = params.set('rating', rating.toString());
    }

    return this._httpClient.get<PaginatedMovies>(`${this.apiUrl}/movies`, {
      params,
      headers: this.headers,
    });
  }

  getMovie(id: string): Observable<Movie> {
    return this._httpClient.get<Movie>(`${this.apiUrl}/movies/${id}`, {
      headers: this.headers,
    });
  }

  deleteMovie(id: string): Observable<Movie> {
    return this._httpClient.delete<Movie>(`${this.apiUrl}/movies/${id}`, {
      headers: this.headers,
    });
  }

  postMovie(movie: Movie): Observable<Movie> {
    return this._httpClient.post<Movie>(
      `${this.apiUrl}/movies`,
      {
        genres: movie.genres,
        pegi: movie.pegi,
        title: movie.title,
        year: movie.year,
        description: movie.description,
        hasOscar: movie.hasOscar,
        imageUrl: movie.imageUrl,
        duration: movie.duration,
        rating: movie.rating,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateMovie(id: string, updatedMovie: Movie): Observable<Movie> {
    console.log(updatedMovie);
    return this._httpClient.put<Movie>(
      `${this.apiUrl}/movies/${id}`,
      {
        genres: updatedMovie.genres,
        pegi: updatedMovie.pegi,
        title: updatedMovie.title,
        year: updatedMovie.year,
        description: updatedMovie.description,
        hasOscar: updatedMovie.hasOscar,
        imageUrl: updatedMovie.imageUrl,
        duration: updatedMovie.duration,
        rating: updatedMovie.rating,
      },
      {
        headers: this.headers,
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this._httpClient.post<Movie>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }
  registrate(
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this._httpClient.post<Movie>(`${this.apiUrl}/auth/register`, {
      email,
      username,
      password,
    });
  }

  getActors(): Observable<Star[]> {
    return this._httpClient.get<Star[]>(`${this.apiUrl}/stars`, {
      headers: this.headers,
    });
  }

  getDirectors(): Observable<Director[]> {
    return this._httpClient.get<Director[]>(`${this.apiUrl}/directors`, {
      headers: this.headers,
    });
  }

  updateMovieStars(id: string, stars: Star[]): Observable<Movie> {
    return this._httpClient.post<Movie>(
      `${this.apiUrl}/movies/${id}/stars`,
      { starsIds: stars.map((v) => v.id) },
      {
        headers: this.headers,
      }
    );
  }

  updateMovieDirector(id: string, director: Director): Observable<Movie> {
    return this._httpClient.post<Movie>(
      `${this.apiUrl}/movies/${id}/director`,
      { directorId: director.id },
      {
        headers: this.headers,
      }
    );
  }
}
