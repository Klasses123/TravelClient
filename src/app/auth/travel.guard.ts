import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserHttpService } from '../services/http-services/user-http-service';

@Injectable({
  providedIn: 'root'
})
export class TravelGurad implements CanActivate {
  constructor(
    private userService: UserHttpService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.userService.canCreateTravel();
  }
}
