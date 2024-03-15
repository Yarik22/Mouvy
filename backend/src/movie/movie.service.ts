import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { DatabaseService } from 'src/database/database.service';
import { DirectorService } from 'src/director/director.service';
import { Observable, switchMap } from 'rxjs';
import { StarService } from 'src/star/star.service';

@Injectable()
export class MovieService extends DatabaseService<Movie> {
  constructor(
    @InjectRepository(Movie)
    protected readonly repository: Repository<Movie>,
    private readonly directorService: DirectorService,
    private readonly starService: StarService, // Import ActorService if not already imported
  ) {
    super(repository);
  }

  addDirectorToMovie(
    movieId: string,
    directorId: string | null,
  ): Observable<Movie> {
    return this.findById(movieId).pipe(
      switchMap((movie) => {
        if (!movie) {
          throw new NotFoundException('Movie not found');
        }
        if (!directorId) {
          movie.director = null;
          return this.repository.save(movie);
        }
        return this.directorService.findById(directorId).pipe(
          switchMap((director) => {
            if (!director) {
              throw new NotFoundException('Director not found');
            }
            movie.director = director;
            return this.repository.save(movie);
          }),
        );
      }),
    );
  }

  addActorsToMovie(movieId: string, starsIds: string[]): Observable<Movie> {
    return this.findById(movieId).pipe(
      switchMap((movie) => {
        if (!movie) {
          throw new NotFoundException('Movie not found');
        }
        if (!starsIds) {
          movie.stars = null;
          return this.repository.save(movie);
        }
        return this.starService.findByIds(starsIds).pipe(
          switchMap((stars) => {
            if (stars.length !== starsIds.length) {
              throw new NotFoundException('One or more actors not found');
            }
            movie.stars = stars;
            return this.repository.save(movie);
          }),
        );
      }),
    );
  }
}
