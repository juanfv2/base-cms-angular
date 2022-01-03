import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {JfAuthGuard, NotFoundComponent} from 'base-cms'

import {k} from 'projects/first-app/src/environments/k'
import {AdminComponent} from './components/admin/admin.component'
import {LoginComponent} from './components/login/login.component'

const routes: Routes = [
  {redirectTo: 'dashboard', pathMatch: 'full', path: ''},
  {redirectTo: 'dashboard', pathMatch: 'full', path: k.routes.frontEnd.name},
  {redirectTo: 'dashboard', pathMatch: 'full', path: `${k.routes.frontEnd.name}:company/:anyId`},
  {
    path: '',
    component: AdminComponent,
    canActivate: [JfAuthGuard],
    children: [{path: '', loadChildren: () => import('./main/main.module').then((m) => m.MainModule)}],
  },
  {path: 'login', component: LoginComponent},
  // {path: 'not-authorized', component: LoginComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
