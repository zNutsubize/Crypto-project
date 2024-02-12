import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginAccessGuard } from './core/guards/login-access.guard';
import { LoginGuard } from './core/guards/login.guard';
import { QuizGuard } from './core/guards/quiz.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./features/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/signup/signup.module').then((m) => m.SignupModule),
    // canLoad: [LoginAccessGuard],
    canActivate: [LoginAccessGuard],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    // canLoad: [LoginAccessGuard],
    canActivate: [LoginAccessGuard],
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canLoad: [LoginGuard],
  },

  {
    path: 'tracker',
    loadChildren: () =>
      import('./features/coin-tracker/coin-tracker.module').then(
        (m) => m.CoinTrackerModule
      ),
    canLoad: [LoginGuard],
  },

  {
    path: 'watchlist',
    loadChildren: () =>
      import('./features/watchlist/watchlist.module').then(
        (m) => m.WatchlistModule
      ),
    canLoad: [LoginGuard],
  },

  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/quiz/components/welcome/quiz.module').then(
        (m) => m.QuizModule
      ),
  },

  {
    path: 'questions',
    loadChildren: () =>
      import('./features/quiz/components/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
    canLoad: [QuizGuard],
  },

  {
    path: 'converter',
    loadChildren: () =>
      import('./features/converter/converter.module').then(
        (m) => m.ConverterModule
      ),
    canLoad: [LoginGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
