import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

import {k} from '../../environments/k'

import {Permission, Role} from '../../resources/models'

import {JfAuthService} from '../../services/jf-auth.service'
import {JfMessageService} from '../../services/jf-message.service'

import {JfRequestOption} from '../../support/jf-request-option'
import {JfUtils} from '../../support/jf-utils'

@Component({
  selector: 'base-cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onLogOutEvent = new EventEmitter()
  @Output() onProfileEvent = new EventEmitter()
  @Output() onChangeRoleEvent = new EventEmitter()
  @Input() allowChangeRole = true
  @Input() allowChangeProfile = false
  @Input() labels: any
  $layer: any
  currentUser: any
  toggleButton = false
  private listTitles: Permission[] = []

  isCollapsed = true
  project_name = k.project_name
  currentPage = ''
  sb: any

  constructor(
    private router: Router,
    private location: Location,
    private authService: JfAuthService,
    private messageService: JfMessageService
  ) {
    authService.currentUser.subscribe((u: any) => (this.currentUser = u))
    this.allowChangeProfile = JfRequestOption.isAuthorized(`/${k.routes.users}/edit`)
  }

  ngOnInit() {
    this.getMenuTitles()
    this.router.events.subscribe((event: any) => {
      this.getTitle()
      this.setupSideBar()
      this.sidebarClose()
    })
  }

  private setupSideBar() {
    const val = JfUtils.mStorage.getItem(k._8_isSideBarVisible) || '{"isSideBarVisible": false}'
    this.sb = JfUtils.jsonValidated(val) || {isSideBarVisible: false}
  }

  sidebarToggle() {
    if (this.sb?.isSideBarVisible) {
      this.sidebarClose()
    } else {
      this.sidebarOpen()
    }

    const val_sb = JSON.stringify(this.sb)

    JfUtils.mStorage.setItem(k._8_isSideBarVisible, val_sb)
  }

  sidebarOpen() {
    const html = document.getElementsByTagName('html')[0]
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement

    if (window.innerWidth < 991) {
      if (mainPanel) {
        mainPanel.style.position = 'fixed'
      }
    }

    setTimeout(() => {
      this.toggleButton = true
    }, 500)

    html.classList.add('nav-open')
    if (this.sb) this.sb.isSideBarVisible = true
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0]
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement

    if (window.innerWidth < 991) {
      setTimeout(() => {
        if (mainPanel) {
          mainPanel.style.position = ''
        }
      }, 500)
    }

    setTimeout(() => {
      this.toggleButton = false
    }, 500)

    html.classList.remove('nav-open')
    if (this.sb) this.sb.isSideBarVisible = false
  }

  getTitle() {
    const path = this.location.path().split('/')
    const _title = path[1]

    // console.log('path', path)
    // console.log('_title', _title)
    // console.log('this.listTitles', this.listTitles)

    const item = this.listTitles.find((p) => p.urlFrontEnd?.indexOf(_title) !== -1)
    // console.log('item', item);

    const mTitle = item?.name ?? 'Dashboard'

    this.currentPage = `${k.project_name} - ${mTitle}`
  }

  getMenuTitles() {
    const menus = this.currentUser?.role.menus
    if (menus) {
      menus.forEach((m: Permission) => {
        this.listTitles.push(m)
        m.subMenus?.forEach((sm) => this.listTitles.push(sm))
      })
    }
  }

  profile() {
    if (!this.allowChangeProfile) {
      this.onProfileEvent.emit(this.currentUser)
      return
    }

    this.router.navigate([k.routes.users, this.currentUser.id, 'profile'])
  }

  onLogOut() {
    this.authService.logout().subscribe({
      next: () => {
        // remove user from local storage to log user out
        this.messageService.success(k.project_name, 'Ahora estás desconectado.')
      },
      error: (error: any) => {
        console.log('HeaderComponent.onLogOut error', error)
      },
    })
    this.onLogOutEvent.emit(this.currentUser)
    this.router.navigate(['login'])
  }

  onChangeRole(cRole: any) {
    if (!this.allowChangeRole) {
      this.onChangeRoleEvent.emit(cRole)
      return
    }

    cRole.urlPermissions.push('/dashboard')
    cRole.urlPermissions.push('/not-authorized')
    cRole.urlPermissions.push('/not-found')

    this.currentUser!.role = cRole

    JfUtils.mStorage.setItem(k._1_user, JSON.stringify(this.currentUser))
    JfUtils.mStorage.setItem(k._11_permissions, JSON.stringify(cRole.urlPermissions))

    this.authService.currentUser.next(this.currentUser!)
    this.getMenuTitles()
  }
}
