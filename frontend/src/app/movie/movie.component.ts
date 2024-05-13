import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RoleName } from '../../types/user';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  movie!: Movie;
  roles: RoleName[] = [];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private navigator: Router,
    auth: AuthService,
    private dialog: MatDialog
  ) {
    const cookieName = 'authToken';
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`));
    if (cookieValue) {
      this.roles = auth.decodeToken(cookieValue).roles;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getMovie(id).subscribe((movie: Movie) => {
        this.movie = movie;
      });
    }
  }

  isAdmin() {
    return this.roles.some((v) => v === RoleName.ADMIN);
  }
  isModerator() {
    return this.roles.some((v) => v === RoleName.MODERATOR);
  }

  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMovie();
      }
    });
  }

  deleteMovie(): void {
    if (this.movie.id) {
      this.dataService.deleteMovie(this.movie.id).subscribe(
        () => {
          console.log('Movie deleted successfully');
          this.navigator.navigate(['/movies']);
        },
        (error) => {
          console.error('Error deleting movie:', error);
        }
      );
    }
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Delete Confirmation</h2>
    <mat-dialog-content>
      Are you sure you want to delete this item?
    </mat-dialog-content>
    <mat-dialog-actions style="display: flex; justify-content:space-around">
      <button class="custom-button" style="background-color: red;" mat-button (click)="dialogRef.close(true)">
        Delete
      </button>
      <button class="custom-button" mat-button (click)="dialogRef.close()">
        Cancel
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  styleUrl: './movie.component.scss',
  imports: [MatDialogModule],
})
export class DeleteConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}
}
