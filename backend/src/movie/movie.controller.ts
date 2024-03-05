import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    const movieId = +id;
    try {
      const movie = await this.movieService.getMovieById(movieId);
      return movie;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async getMovies(): Promise<Movie[]> {
    return await this.movieService.getMovies();
  }
}
