import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {Constants} from '../../../environments/constants'
import {Permission} from '../../../resources/models'
import {JfUtils} from '../../../support/jf-utils'

@Component({
  selector: 'base-cms-sub-menu',
  template: `
    @if (menu.subMenus?.length) {
      <ul class="nav" id="{{ menu.icon }}" role="menu">
        @for (subMenu of menu.subMenus; track subMenu) {
          <li
        class="nav-item --{{ subMenu.name }}--{{ (sideBarObj | async)?.subMenu }}--{{ subMenu.urlFrontEnd }}--{{
          linkSelected
        }}"
            [class.active]="subMenu.name === (sideBarObj | async)?.subMenu || subMenu.urlFrontEnd === linkSelected"
            >
            <a
              (click)="subMenu.subMenus?.length ? showSubMenu(subMenu.name) : navToOutput.emit(subMenu)"
              [disableTooltip]="!!(sideBarObj | async)?.isSideBarVisible"
              [ngbTooltip]="subMenu.name"
              container="body"
              placement="right"
              >
              <i class="fas fa-{{ subMenu.icon }}"></i>
              <p>{{ subMenu.name }}</p>
            </a>
            @if (subMenu.name === (sideBarObj | async)?.subMenu) {
              <base-cms-sub-menu
                [menu]="subMenu"
                [sideBarObj]="sideBarObj"
                [linkSelected]="linkSelected"
                (navToOutput)="navToOutput.emit($event)"
              ></base-cms-sub-menu>
            }
          </li>
        }
      </ul>
    }
    `,
})
export class SubMenuComponent implements OnInit {
  isSubMenuOpen = false

  @Input() menu!: Permission
  @Input() sideBarObj = new BehaviorSubject({isSideBarVisible: false, menu: '', subMenu: ''})
  @Input() linkSelected?: any

  @Output() navToOutput = new EventEmitter()

  ngOnInit() {}

  showSubMenu(element: any) {
    this.isSubMenuOpen = element === this.menu.name

    const val = JfUtils.mStorage.getItem(Constants._8_isSideBarVisible) || '{"isSideBarVisible": false}'
    const sb: any = JSON.parse(val) || {isSideBarVisible: false}

    if (sb.subMenu === element) {
      sb.subMenu = '-'
    } else {
      sb.subMenu = element
    }
    sb.link = '-'
    sb.isSideBarVisible = true

    this.setSidebarVisible(sb)
  }

  setSidebarVisible(sb: any): void {
    sb.isSideBarVisible = !sb.isSideBarVisible

    this.sideBarObj.next(sb)

    JfUtils.mStorage.setItem(Constants._8_isSideBarVisible, JSON.stringify(sb))
  }
}
