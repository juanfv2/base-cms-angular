import {Injectable} from '@angular/core'
import {
  Router,
  UrlTree,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import {Observable} from 'rxjs'
import {configs} from '../environments/k'
import {JfRequestOption} from '../support/jf-request-option'

@Injectable({
  providedIn: 'root',
})
export class JfAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticate = JfRequestOption.isAuthenticate()
    // console.log('AuthGuard.isAuthenticate: ', `"${isAuthenticate}"`)
    // console.log('     AuthGuard.state.url: ', state.url)
    // console.log('AuthGuard.isAuthenticate: ', isAuthorized)
    if (isAuthenticate) {
      const isAuthorized = JfRequestOption.isAuthorized(state.url)
      if (!isAuthorized) {
        this.router.navigate(['not-authorized'])
      }

      return isAuthorized
    }

    this.router.navigate([configs.routes.auth.login], {queryParams: {returnUrl: state.url}})
    return false
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true
  }
}
