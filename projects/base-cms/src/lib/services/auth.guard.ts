import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Observable} from 'rxjs'
import {JfRequestOption} from '../support/jf-request-option'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticate = JfRequestOption.isAuthenticate()
    // console.log('AuthGuard.isAuthenticate', `"${isAuthenticate}"`);
    if (isAuthenticate) {
      const isAuthorized = JfRequestOption.isAuthorized(state.url)
      // console.log('     AuthGuard.state.url: ', state.url);
      // console.log('AuthGuard.isAuthenticate: ', isAuthorized);

      if (!isAuthorized) {
        this.router.navigate(['not-authorized'])
      }

      return isAuthorized
    }

    this.router.navigate(['login'], {queryParams: {returnUrl: state.url}})
    return false
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true
  }
}
