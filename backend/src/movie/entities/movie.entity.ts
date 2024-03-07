import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/baseEntity.entity';

@Entity('movie')
export class Movie extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'The title of the movie.' })
  title: string;

  @Column()
  @ApiProperty({ description: 'The director of the movie.' })
  director: string;

  @Column({ type: 'integer' })
  @ApiProperty({ description: 'The release year of the movie.' })
  year: number;
}
