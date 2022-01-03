import {Component, Input, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

import {configs} from '../../environments/configs'

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
  mobileMenuVisible = 0
  toggleButton = false
  private isSidebarVisible = 0
  private listTitles: Permission[] = []

  isCollapsed = true
  hasPermission2edit = false
  project_name = configs.project_name
  currentPage = ''

  constructor(
    private router: Router,
    private location: Location,
    private authService: JfAuthService,
    private messageService: JfMessageService
  ) {
    // console.log('constructor this.isSidebarVisible', this.isSidebarVisible);

    authService.currentUser.subscribe((u) => (this.currentUser = u))
    this.hasPermission2edit =
      JfRequestOption.isAuthorized(`/${configs.routes.users}/edit`) ||
      JfRequestOption.isAuthorized(`/${configs.routes.users}/show`)

    const s = +`${JfStorageManagement.getItem(configs.isSidebarVisible)}`
    this.isSidebarVisible = s
  }

  ngOnInit() {
    this.getMenuTitles()
    // const navbar: HTMLElement = this.element.nativeElement
    this.router.events.subscribe((event) => {
      this.getTitle()
      this.sidebarClose()
      const $layer: any = document.getElementsByClassName('close-layer')[0]
      if ($layer) {
        $layer.remove()
        this.mobileMenuVisible = 0
      }
    })
    // this.sidebarToggle()
  }

  sidebarToggle() {
    // console.log('sidebarToggle.1.this.isSidebarVisible', this.isSidebarVisible);

    this.$layer = document.createElement('div')
    this.$layer.setAttribute('class', 'close-layer')

    const html = document.getElementsByTagName('html')[0]

    if (this.mobileMenuVisible === 1) {
      html.classList.remove('nav-open')
      if (this.$layer) {
        this.$layer.remove()
      }
      setTimeout(() => {
        this.toggleButton = false
      }, 400)

      this.mobileMenuVisible = 0
    } else {
      setTimeout(() => {
        this.toggleButton = true
      }, 430)

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild(this.$layer)
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild(this.$layer)
      }

      setTimeout(() => {
        this.$layer.classList.add('visible')
      }, 100)

      this.$layer.onclick = () => {
        html.classList.remove('nav-open')
        this.mobileMenuVisible = 0
        this.$layer.classList.remove('visible')

        setTimeout(() => {
          this.$layer.remove()
          this.toggleButton = false
        }, 400)
      }

      html.classList.add('nav-open')
      this.mobileMenuVisible = 1
    }

    if (this.isSidebarVisible) {
      this.sidebarClose()
    } else {
      this.sidebarOpen()
    }

    JfStorageManagement.setItem(
      configs.isSidebarVisible,
      `${this.isSidebarVisible ? configs.isSidebarVisibleClose : configs.isSidebarVisibleOpen}`
    )
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
    this.isSidebarVisible = configs.isSidebarVisibleOpen
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
    this.isSidebarVisible = configs.isSidebarVisibleClose
  }

  getTitle() {
    let mTitle = 'Dashboard'
    const path = this.location.path(true).split('/')
    const _title = path[0]

    // console.log('path', path)
    // console.log('_title', _title)
    // console.log('this.listTitles', this.listTitles)

    const item = this.listTitles.find((p) => p.urlFrontEnd?.indexOf(_title) !== -1)
    // console.log('item', item);

    if (item) {
      mTitle = item.name!
    }

    this.currentPage = `${configs.project_name} - ${mTitle}`
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
        this.messageService.success(configs.project_name, 'Ahora estás desconectado.')
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

    JfStorageManagement.setItem(configs.user, JSON.stringify(this.currentUser))
    JfStorageManagement.setItem(configs.permissions, JSON.stringify(cRole.urlPermissions))

    this.authService.currentUser.next(this.currentUser!)
    this.getMenuTitles()
  }
}
