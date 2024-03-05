import { Routes } from '@angular/router';
import { FeedbackPageComponent } from './pages/feedback/feedback.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home/home.component';
import { MoviePageComponent } from './pages/movie/movie.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:HomePageComponent },
  { path: 'feedback', component: FeedbackPageComponent },
  { path: 'movies/:id', component:MoviePageComponent },
  { path: '**', component: PageNotFoundComponent },
];
