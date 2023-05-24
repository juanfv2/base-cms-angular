import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {k} from '../../../environments/k'
import {Permission} from '../../../resources/models'
import {JfUtils} from '../../../support/jf-utils'

@Component({
  selector: 'base-cms-sub-menu',
  template: `
    <ul *ngIf="menu.subMenus?.length" class="nav" id="{{ menu.icon }}" role="menu">
      <li
        *ngFor="let subMenu of menu.subMenus"
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
        <base-cms-sub-menu
          *ngIf="subMenu.name === (sideBarObj | async)?.subMenu"
          [menu]="subMenu"
          [sideBarObj]="sideBarObj"
          [linkSelected]="linkSelected"
          (navToOutput)="navToOutput.emit($event)"
        ></base-cms-sub-menu>
      </li>
    </ul>
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

    const val = JfUtils.mStorage.getItem(k._8_isSideBarVisible) || '{"isSideBarVisible": false}'
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

    JfUtils.mStorage.setItem(k._8_isSideBarVisible, JSON.stringify(sb))
  }
}
