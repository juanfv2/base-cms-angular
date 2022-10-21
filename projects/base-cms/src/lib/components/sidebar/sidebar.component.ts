import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, Observable} from 'rxjs'
import {k} from '../../environments/k'
import {JfStorageManagement} from '../../support/jf-storage-management'

@Component({
  selector: 'base-cms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  project_name = k.project_name
  @Input() menus: any[] = []

  isActive = false
  subMenuOpened = '-'
  menuSelected = 'dashboard'
  currentUser: any
  @Output() isNav = new EventEmitter()
  isClosedSideBar?: Observable<number>

  private readonly menuSelectedK = 'menuSelected'
  private readonly subMenuOpenedK = 'subMenuOpened'

  isSideBarVisible = new BehaviorSubject(k.isSidebarVisibleOpen)

  constructor(public router: Router) {
    this.menuSelected = JfStorageManagement.getItem(this.menuSelectedK) || 'dashboard'
    this.subMenuOpened = JfStorageManagement.getItem(this.subMenuOpenedK) || '-'

    const sideBarVisible = +`${JfStorageManagement.getItem(k.isSidebarVisible)}`

    this.isSideBarVisible.next(sideBarVisible)
  }

  ngOnInit() {
    this.updateMenus()
  }

  eventCalled() {
    this.isActive = !this.isActive
  }

  navTo(urlStr: string) {
    this.isNav.emit(true)
    this.menuSelected = urlStr
    this.router.navigate([urlStr])
    JfStorageManagement.setItem(this.menuSelectedK, this.menuSelected)

    this.setSidebarVisible(k.isSidebarVisibleClose)
  }

  showSubMenu(element: any) {
    if (element === this.subMenuOpened) {
      this.subMenuOpened = '-'
    } else {
      this.subMenuOpened = element
      JfStorageManagement.setItem(this.subMenuOpenedK, this.subMenuOpened)
    }
  }

  updateMenus() {
    this.isClosedSideBar = this.isSideBarVisible.asObservable()
  }

  setSidebarVisible(isSidebarVisible: number): void {
    this.isSideBarVisible.next(isSidebarVisible)
    JfStorageManagement.setItem(
      k.isSidebarVisible,
      `${isSidebarVisible ? k.isSidebarVisibleClose : k.isSidebarVisibleOpen}`
    )
  }
}
