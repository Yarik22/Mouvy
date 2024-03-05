import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule,DurationPipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MoviePageComponent {
  movie?: Movie;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovie(+id).subscribe((movie) => {
        this.movie = movie;
        console.log(movie.duration);
      });
    }
  }
}
