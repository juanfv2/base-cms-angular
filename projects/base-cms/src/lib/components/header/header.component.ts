import {Component, Input, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

import {k} from '../../environments/k'

import {Permission, Role} from '../../resources/models'

import {JfAuthService} from '../../services/jf-auth.service'
import {JfMessageService} from '../../services/jf-message.service'

import {JfRequestOption} from '../../support/jf-request-option'
import {JfStorageManagement} from '../../support/jf-storage-management'

@Component({
  selector: 'base-cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() labels: any
  $layer: any
  currentUser: any
  toggleButton = false
  private listTitles: Permission[] = []

  isCollapsed = true
  hasPermission2edit = false
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
    this.hasPermission2edit =
      JfRequestOption.isAuthorized(`/${k.routes.users}/edit`) || JfRequestOption.isAuthorized(`/${k.routes.users}/show`)
  }

  private setupSideBar() {
    const val = JfStorageManagement.getItem(k._8_isSidebarVisible) || ''
    this.sb = JSON.parse(val) || {isSideBarVisible: false}
  }

  ngOnInit() {
    this.getMenuTitles()
    this.router.events.subscribe((event: any) => {
      this.getTitle()
      this.setupSideBar()
      this.sidebarClose()
    })
  }

  sidebarToggle() {
    if (this.sb?.isSidebarVisible) {
      this.sidebarClose()
    } else {
      this.sidebarOpen()
    }

    const val_sb = JSON.stringify(this.sb)

    JfStorageManagement.setItem(k._8_isSidebarVisible, val_sb)
  }

  sidebarOpen() {
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement
    const html = document.getElementsByTagName('html')[0]
    if (window.innerWidth < 991) {
      if (mainPanel) {
        mainPanel.style.position = 'fixed'
      }
    }

    setTimeout(() => {
      this.toggleButton = true
    }, 500)

    html.classList.add('nav-open')
    this.sb.isSideBarVisible = true
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0]
    this.toggleButton = false
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement

    if (window.innerWidth < 991) {
      setTimeout(() => {
        if (mainPanel) {
          mainPanel.style.position = ''
        }
      }, 500)
    }
    html.classList.remove('nav-open')
    this.sb.isSideBarVisible = false
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

  onLogOut() {
    this.authService.logout().subscribe({
      next: (data) => {
        // remove user from local storage to log user out
        this.messageService.success(k.project_name, 'Ahora estás desconectado.')
      },
      error: (error) => {
        console.log('HeaderComponent.onLogOut error', error)
      },
    })
    this.router.navigate(['login'])
  }

  onChangeRole(cRole: Role) {
    cRole.urlPermissions.push('/dashboard')
    cRole.urlPermissions.push('/not-authorized')
    cRole.urlPermissions.push('/not-found')
    //   this.currentRole = cRole;

    // console.log('this.currentRole', this.currentRole);
    this.currentUser!.role = cRole

    JfStorageManagement.setItem(k._1_user, JSON.stringify(this.currentUser))
    JfStorageManagement.setItem(k._11_permissions, JSON.stringify(cRole.urlPermissions))

    this.authService.currentUser.next(this.currentUser!)
    this.getMenuTitles()
  }
}
