import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre, Movie, PEGI, PaginatedMovies } from '../../types/movie';
import { environment } from '../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

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
    return this._httpClient.post<Movie>(`${this.apiUrl}/movies`, movie, {
      headers: this.headers,
    });
  }

  updateMovie(id: string, updatedMovie: Movie): Observable<Movie> {
    return this._httpClient.put<Movie>(
      `${this.apiUrl}/movies/${id}`,
      updatedMovie,
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
}
