import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movies.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [MovieService],
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Mouvy';
}
