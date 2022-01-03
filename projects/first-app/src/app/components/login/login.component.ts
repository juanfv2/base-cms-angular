import {Component, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {Router, ActivatedRoute} from '@angular/router'
import {environment} from 'projects/first-app/src/environments/environment'

import {JfAuthService, JfCrudService, JfMessageService, JfStorageManagement, JfResponse} from 'base-cms'

import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'
import {User} from 'projects/first-app/src/app/models/_models'
import {Development} from 'projects/first-app/src/environments/resources'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  project_name = k.project_name
  labels = l
  sending = false
  returnUrl = ''

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: JfAuthService,
    private messageService: JfMessageService
  ) {
    // this.getCompanyFormServer()
  }

  ngOnInit(): void {
    let e = ''
    let p = ''
    if (!environment.production) {
      const t = new Development()
      // console.log('t', t.u())
      e = t.u()
      p = t.p()
    }
    this.form = this.formBuilder.group({
      email: [e, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: [p, Validators.required],
    })

    // reset login status
    this.sending = false
  }

  login(): void {
    const includes = ['token', 'person', 'photo', {roles: [{menus: ['subMenus']}, 'urlPermissions']}]

    this.sending = true
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard'

    this.authService.login(this.form.value.email, this.form.value.password, includes).subscribe({
      next: (resp: JfResponse) => {
        const user = resp.data as User
        this.sending = false
        if (user && user.token) {
          JfStorageManagement.setItem(k.expire, `${new Date().getTime() + k.expireTime * 60 * 60 * 1000}`)

          user.role = user.roles[0]
          if (user.role_id) {
            user.role = user.roles.find((r) => r.id === user.role_id)!
          }
          if (!user.role) {
            this.messageService.danger(k.project_name, 'No tiene ningún rol definido')
            return
          }
          user.role.urlPermissions.push('/dashboard')
          user.role.urlPermissions.push('/not-authorized')
          user.role.urlPermissions.push('/not-found')
          user.role.urlPermissions.push('/download-file/show')

          const cDev = JfStorageManagement.getItem(k.dev)
          const entityGlobalId = `${JfStorageManagement.getItem(k.entityGlobalId)}`
          const userEntityGlobalId = user.country ? user.country.id : entityGlobalId

          JfStorageManagement.setItem(k.user_role_id, `${user.role.id}`)
          JfStorageManagement.setItem(k.user_id, `${user.id}`)
          JfStorageManagement.setItem(k.entityGlobalId, `${userEntityGlobalId}`)
          JfStorageManagement.setItem(
            k.entityGlobal,
            JSON.stringify(user.country) || '{"id":194,"name":"El Salvador", "code": "sv"}'
          )

          JfStorageManagement.setItem(k.user, JSON.stringify(user))

          JfStorageManagement.setItem(k.token, user.token)
          JfStorageManagement.setItem(k.permissions, JSON.stringify(user.role.urlPermissions))

          this.authService.currentUser.next(user)
          // this.authService.isSideBarVisible.next(k.isSidebarVisibleOpen)
          // JfStorageManagement.setItem(k.isSidebarVisible, `${k.isSidebarVisibleOpen}`)

          if (userEntityGlobalId === entityGlobalId) {
            this.router.navigate([this.returnUrl], {replaceUrl: true})
          } else {
            const rDevelop = cDev || ''
            const newLocal = `/admin${rDevelop}/${userEntityGlobalId}#${this.returnUrl}`
            // console.log('newLocal', newLocal);
            location.href = newLocal
          }

          // if success change to the body/dashboard component
          this.messageService.success(k.project_name, 'Ahora está conectado.')
        }
      },
      error: (error: any) => {
        this.sending = false
        this.messageService.danger(k.project_name, error)
        // console.log('error', error);
      },
    })
  }
}
