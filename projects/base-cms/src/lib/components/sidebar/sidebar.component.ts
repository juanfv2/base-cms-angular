import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, Observable} from 'rxjs'
import {JfUtils} from '../../support/jf-utils'
import {Constants} from '../../environments/constants'
import {Permission} from '../../resources/models'

@Component({
  selector: 'base-cms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  project_name = Constants.project_name
  @Input() menus: any[] = []

  isActive = false
  isSubMenuOpen = false
  menuSelected = 'dashboard'
  linkSelected = 'dashboard'
  currentUser: any
  @Output() isNav = new EventEmitter()

  sideBarObserver?: Observable<any>
  sideBarObj = new BehaviorSubject({isSideBarVisible: false, menu: '', subMenu: ''})

  constructor(public router: Router) {
    const sb = this.setupSideBar()

    this.setSidebarVisible(sb)
  }

  ngOnInit() {
    this.updateMenus()
  }

  eventCalled() {
    this.isActive = !this.isActive
  }

  navTo(p: Permission) {
    this.isNav.emit(true)
    this.router.navigate([p.urlFrontEnd])
    this.linkSelected = p.urlFrontEnd + ''

    const sb = this.setupSideBar()

    sb.link = this.linkSelected
    // sb.subMenu = '-'
    sb.isSideBarVisible = true

    this.setSidebarVisible(sb)
  }

  showSubMenu(element: any) {
    this.isSubMenuOpen = element === this.menuSelected
    this.menuSelected = element

    const sb = this.setupSideBar()

    if (sb.menu === element) {
      sb.menu = '-'
    } else {
      sb.menu = element
    }

    sb.link = '-'
    sb.subMenu = '-'
    sb.isSideBarVisible = true

    this.setSidebarVisible(sb)
  }

  updateMenus() {
    this.sideBarObserver = this.sideBarObj.asObservable()
  }

  setSidebarVisible(sb: any): void {
    sb.isSideBarVisible = !sb?.isSideBarVisible

    this.sideBarObj.next(sb)
    const val = JSON.stringify(sb)

    JfUtils.mStorage.setItem(Constants._8_isSideBarVisible, val)
  }

  setupSideBar() {
    const val = JfUtils.mStorage.getItem(Constants._8_isSideBarVisible) || '{"isSideBarVisible": false}'
    return JfUtils.jsonValidated(val) || {isSideBarVisible: false}
  }
}
