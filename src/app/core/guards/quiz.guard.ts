import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/features/quiz/services/quiz.service';

@Injectable({
  providedIn: 'root',
})
export class QuizGuard implements CanActivate, CanLoad {
  constructor(private quizService: QuizService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.quizService.getStartStatus()) {
      return true;
    } else {
      this.router.navigate(['/quiz']);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.quizService.getStartStatus()) {
      return true;
    } else {
      this.router.navigate(['/quiz']);
      return false;
    }
  }
}
