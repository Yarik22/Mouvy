// movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  year: number;
}

export class UpdateMovieDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  director?: string;

  @ApiProperty()
  year?: number;
}
