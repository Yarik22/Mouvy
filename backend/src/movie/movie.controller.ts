// movie.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all movies.',
    type: Movie,
    isArray: true,
  })
  findAll(): Observable<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the movie with the specified ID.',
    type: Movie,
  })
  findOne(@Param('id') id: string): Observable<Movie> {
    return this.movieService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateMovieDto, description: 'New movie details' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new movie.',
    type: Movie,
  })
  create(@Body() createMovieDto: CreateMovieDto): Observable<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiBody({ type: UpdateMovieDto, description: 'Updated movie details' })
  @ApiResponse({
    status: 200,
    description: 'Updates the movie with the specified ID.',
  })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Observable<UpdateResult> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the movie with the specified ID.',
  })
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.movieService.delete(id);
  }
}
