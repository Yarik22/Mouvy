import { Component, OnInit } from '@angular/core';
import { Genre, Movie, MovieService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HighlightingDirective } from '../../directives/highlighting.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HighlightingDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent implements OnInit {
  movies: Movie[] = [];
  genres: Genre[] = Object.values(Genre);
  selectedGenres: Genre[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  switchGenres(event: any, genre: Genre) {
    if (event.target.checked) {
      this.selectedGenres.push(genre);
    } else {
      const index = this.selectedGenres.indexOf(genre);
      if (index !== -1) {
        this.selectedGenres.splice(index, 1);
      }
    }
  }

  get filteredMovies(): Movie[] {
    if (this.selectedGenres.length === 0) {
      return this.movies;
    }
    return this.movies.filter(movie => {
      return this.selectedGenres.some(genre => movie.genres.includes(genre));
    });
  }
}