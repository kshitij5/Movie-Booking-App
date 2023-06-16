import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/User.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      // This is the injected auth service which depends on what you are using
      return true;
    }
    console.log('access denied!');
    this.router.navigate(['/login']);
    Swal.fire('Login required', 'To Book Movie Login First', 'info');
    return false;
  }
}
