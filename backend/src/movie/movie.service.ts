import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovieService extends DatabaseService<Movie> {
  constructor(
    @InjectRepository(Movie)
    protected readonly repository: Repository<Movie>,
  ) {
    super(repository);
  }
}
