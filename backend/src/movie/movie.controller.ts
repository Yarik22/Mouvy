// movie.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import {
  AddDirectorDto,
  AddStarsDto,
  CreateMovieDto,
  UpdateMovieDto,
} from './dto/movie.dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@ApiBearerAuth()
@UseGuards(AuthGuard,RoleGuard)
@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {}
  @Role(RoleName.MODERATOR,RoleName.ADMIN,RoleName.USER)
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

  @Role(RoleName.MODERATOR,RoleName.ADMIN,RoleName.USER)
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

  @Role(RoleName.ADMIN)
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

  @Role(RoleName.MODERATOR,RoleName.ADMIN)
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

  @Role(RoleName.ADMIN)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletes the movie with the specified ID.',
  })
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.movieService.delete(id);
  }

  @Role(RoleName.MODERATOR,RoleName.ADMIN)
  @Post(':movieId/director')
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiBody({ type: AddDirectorDto, description: 'Director ID' })
  @ApiResponse({
    status: 200,
    description: 'Adds the specified director to the movie.',
  })
  addDirectorToMovie(
    @Param('movieId') movieId: string,
    @Body('directorId') directorId: string,
  ): Observable<Movie> {
    return this.movieService.addDirectorToMovie(movieId, directorId);
  }

  @Role(RoleName.MODERATOR,RoleName.ADMIN)
  @Post(':movieId/stars')
  @ApiBody({ type: AddStarsDto, description: 'Stars ID' })
  @ApiResponse({
    status: 200,
    description: 'Adds the specified director to the movie.',
  })
  addStarsToMovie(
    @Param('movieId') movieId: string,
    @Body('starsIds') starsIds: string[],
  ): Observable<Movie> {
    return this.movieService.addActorsToMovie(movieId, starsIds);
  }
}
