import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Genre, Movie, PEGI, PaginatedMovies } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { _isNumberValue } from '@angular/cdk/coercion';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  constructor(private readonly dataService: DataService) {}
  movies: Movie[] = [];
  page = 1;
  limit = 1;
  ngOnInit(): void {
    this.fetchMovies();
  }
  genres = Object.values(Genre);
  pegis = Object.values(PEGI)
    .filter((v) => _isNumberValue(v))
    .map((v) => +v);

  selectedGenres: Genre[] = [];
  selectedPegis: PEGI[] = [];
  minRating: number = 0;

  @Output() searchClicked = new EventEmitter<any>();

  onSearch(): void {
    const searchCriteria = {
      genres: this.selectedGenres,
      pegis: this.selectedPegis,
      minRating: this.minRating,
    };
    this.searchClicked.emit(searchCriteria);
  }

  toggleGenreSelection(genre: Genre): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index !== -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
  }

  togglePegiSelection(pegi: number): void {
    const index = this.selectedPegis.indexOf(pegi);
    if (index !== -1) {
      this.selectedPegis.splice(index, 1);
    } else {
      this.selectedPegis.push(pegi);
    }
  }

  fetchMovies(): void {
    this.dataService
      .getMovies(
        this.page,
        this.limit,
        this.selectedGenres,
        this.selectedPegis,
        this.minRating
      )
      .subscribe(
        (paginatedMovies: PaginatedMovies) => {
          this.movies = paginatedMovies.movies;
          console.log('Fetched 3 movies:', this.movies);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
  }
}
