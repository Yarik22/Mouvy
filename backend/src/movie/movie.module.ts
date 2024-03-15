import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movie/entities/movie.entity';
import { DirectorModule } from 'src/director/director.module';
import { DirectorService } from 'src/director/director.service';
import { StarService } from 'src/star/star.service';
import { StarModule } from 'src/star/star.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MovieController],
  providers: [DirectorService,MovieService,StarService],
  imports: [AuthModule,StarModule,DirectorModule,TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}
