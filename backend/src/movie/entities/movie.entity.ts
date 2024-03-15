// movie.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/baseEntity.entity';
import { Director } from 'src/director/entities/director.entity';
import { Star } from 'src/star/entities/star.entity';
import { User } from 'src/user/entities/user.entity';

export enum Genre {
  ACTION = 'Action',
  DRAMA = 'Drama',
  COMEDY = 'Comedy',
}

export enum PEGI {
  THREE = 3,
  SEVEN = 7,
  TWELVE = 12,
  SIXTEEN = 16,
  EIGHTEEN = 18,
}

@Entity()
@Check('"rating" >= 0 and rating <= 100')
export class Movie extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'The title of the movie.' })
  title: string;

  @ManyToOne(() => Director, (director) => director.movies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @ApiProperty({
    description: 'The director of the movie.',
    name: 'directorId',
    example: '112a2371-7421-4a78-8059-615b61ed2dc6',
  })
  director: Director;

  @Column({ type: 'enum', enum: Genre, array: true })
  @ApiProperty({
    enum: Genre,
    isArray: true,
    description: 'The genres of the movie.',
  })
  genres: Genre[];

  @Column({ nullable: true })
  @ApiProperty({ description: 'The description of the movie.', nullable: true })
  description: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'The rating of the movie (0 to 100).' })
  rating: number;

  @Column({ type: 'enum', enum: PEGI, default: 18 })
  @ApiProperty({
    enum: PEGI,
    description: 'The PEGI rating of the movie.',
    default: 18,
  })
  pegi: number;

  @Column()
  @ApiProperty({ description: 'The image URL of the movie.' })
  image: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Indicates if the movie has won an Oscar.' })
  hasOscar: boolean;

  @ManyToMany(() => Star, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'movie_star',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'star_id', referencedColumnName: 'id' },
  })
  stars: Star[];

  @ManyToMany(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'user_favourite_movie',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];
}
