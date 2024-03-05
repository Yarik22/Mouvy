import { Injectable, NotFoundException } from '@nestjs/common';
import { Director, Genre, Movie } from './entities/movie.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovieService {
  constructor(private readonly dbService: DatabaseService) {}

  async getMovieById(id: number): Promise<Movie> {
    const query = `
      SELECT
        m.id,
        m.title,
        m.rating,
        m.release_date,
        m.duration,
        m.pegi,
        d.id AS director_id,
        d.fullname AS director_name,
        ARRAY_AGG(g.name) AS genres
      FROM
        movies m
      JOIN
        directors d ON m.director_id = d.id
      JOIN
        movies_genres mg ON m.id = mg.movie_id
      JOIN
        genres g ON mg.genre_id = g.id
      WHERE
        m.id = $1
      GROUP BY
        m.id, d.id;
    `;

    const result = await this.dbService.query(query, [id]);

    if (result.length === 0) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const movieData = result[0];
    const director: Director = {
      id: movieData.director_id,
      fullname: movieData.director_name,
    };
    const genres: Genre[] = movieData.genres;
    const movie: Movie = {
      id: movieData.id,
      title: movieData.title,
      rating: movieData.rating,
      releaseDate: movieData.release_date,
      duration: movieData.duration,
      pegi: movieData.pegi,
      director,
      genres,
    };
    return movie;
  }
  async getMovies(): Promise<Movie[]> {
    const query = `
      SELECT
        m.id,
        m.title,
        m.rating,
        m.release_date,
        m.duration,
        m.pegi,
        d.id AS director_id,
        d.fullname AS director_name,
        ARRAY_AGG(g.name) AS genres
      FROM
        movies m
      JOIN
        directors d ON m.director_id = d.id
      JOIN
        movies_genres mg ON m.id = mg.movie_id
      JOIN
        genres g ON mg.genre_id = g.id
      GROUP BY
        m.id, d.id;
    `;

    const result = await this.dbService.query(query);

    const movies: Movie[] = result.map((movieData) => {
      const director: Director = {
        id: movieData.director_id,
        fullname: movieData.director_name,
      };
      const genres: Genre[] = movieData.genres;
      const movie: Movie = {
        id: movieData.id,
        title: movieData.title,
        rating: movieData.rating,
        releaseDate: movieData.release_date,
        duration: movieData.duration,
        pegi: movieData.pegi,
        director,
        genres,
      };
      return movie;
    });

    return movies;
  }
}
