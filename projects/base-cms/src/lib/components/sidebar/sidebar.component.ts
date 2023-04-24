import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, Observable} from 'rxjs'
import {k} from '../../environments/k'
import {JfStorageManagement} from '../../support/jf-storage-management'
import {JfCondition} from '../../resources/classes'
import {Permission} from '../../resources/models'

@Component({
  selector: 'base-cms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  project_name = k.project_name
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
    const val = JfStorageManagement.getItem(k.isSidebarVisible) || '{"isSideBarVisible": false}'
    const sb: any = JSON.parse(val) || {isSideBarVisible: false}

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

    const val = JfStorageManagement.getItem(k.isSidebarVisible) || '{"isSideBarVisible": false}'
    const sb: any = JSON.parse(val) || {isSideBarVisible: false}

    sb.link = this.linkSelected
    // sb.subMenu = '-'
    sb.isSideBarVisible = true

    this.setSidebarVisible(sb)
  }

  showSubMenu(element: any) {
    this.isSubMenuOpen = element === this.menuSelected
    this.menuSelected = element

    const val = JfStorageManagement.getItem(k.isSidebarVisible) || '{"isSideBarVisible": false}'
    const sb: any = JSON.parse(val) || {isSideBarVisible: false}

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

    JfStorageManagement.setItem(k.isSidebarVisible, val)
  }
}
