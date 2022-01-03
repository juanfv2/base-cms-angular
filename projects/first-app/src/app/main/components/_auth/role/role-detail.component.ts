import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {
  JfSort,
  JfResponse,
  JfApiRoute,
  JfCondition,
  JfCrudService,
  JfLazyLoadEvent,
  JfRequestOption,
  JfMessageService,
} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

import {Role, Permission, User} from 'projects/first-app/src/app/models/_models'

const kRoute = k.routes.roles

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  @Output() saveClicked = new EventEmitter<Role>()
  @Output() cancelClicked = new EventEmitter()

  @Input() role: Role
  @Input() isSubComponentFrom = '-'
  @Input() isSubComponent = false

  labels = l
  includes = ['permissions']
  mApi = new JfApiRoute(kRoute)
  private mSubscription: any
  sending = false
  hasPermission2new = false
  hasPermission2edit = false

  permissionAll: Permission[] = []
  roleIdsPermissionStr = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudService: JfCrudService,
    private messageService: JfMessageService
  ) {
    this.role = {} as Role
    this.hasPermission2new = JfRequestOption.isAuthorized(`/${kRoute}/new`)
    this.hasPermission2edit = JfRequestOption.isAuthorized(`/${kRoute}/edit`) || this.hasPermission2new
  }

  ngOnInit(): void {
    this.mSubscription = this.route.params.subscribe((params) => {
      const id = this.isSubComponent ? this.role?.id : params['id']
      // console.log('params', params, `\nthis.role`, this.role);
      this.getPermissions()
      this.newRole(this.role)
      if (id !== 'new') {
        this.getRole(id)
      }
    })
  }

  ngOnDestroy(): void {
    if (!this.isSubComponent && this.mSubscription) {
      this.mSubscription.unsubscribe()
    }
  }

  newRole(tempRole?: Role): void {
    this.role = tempRole || ({} as Role)
    delete this.role.id
    this.role.permissions = []
    this.update2permission()
  }

  getRole(id: any): void {
    const mId = id + `?includes=${JSON.stringify(this.includes)}`
    this.sending = true
    this.crudService.getEntity(kRoute, mId).subscribe({
      next: (resp: JfResponse) => {
        this.sending = false
        this.role = resp.data
        this.update2permission()
      },
      error: (error) => {
        this.sending = false
        this.messageService.danger(k.project_name, error, this.labels.role.ownName)
      },
    })
  }

  onSave(): void {
    const modelTemp = JSON.parse(JSON.stringify(this.role))
    // prepare
    modelTemp.permissions = modelTemp.permissions ? modelTemp.permissions.map((item: any) => item.id) : []
    // modelTemp.users = modelTemp.users ? modelTemp.users.map((item: any) => item.id) : []
    // modelTemp.includes = this.includes;
    // prepare
    this.sending = true
    this.crudService.updateEntity(kRoute, modelTemp).subscribe({
      next: (resp: JfResponse) => {
        this.sending = false
        this.role.id = resp.data.id
        this.messageService.success(k.project_name, 'Guardado')
        if (this.isSubComponent) {
          // ?? this.saveClicked.emit(this.role);
        } else {
          this.router.navigate([kRoute, this.role.id])
        }
      },
      error: (error) => {
        this.sending = false
        this.messageService.danger(k.project_name, error, this.labels.role.ownName)
      },
    })
  }

  addNew(): void {
    this.newRole()
    this.router.navigate([kRoute, 'new'])
  }

  onBack(): void {
    if (this.isSubComponent) {
      this.cancelClicked.emit('cancel')
      return
    }

    this.router.navigate([kRoute])
  }

  /* -------------------------------------------------------------------------- */
  /* permissions                                                                */
  /* -------------------------------------------------------------------------- */
  getPermissions(): void {
    const lazyLoadEvent = new JfLazyLoadEvent()
    lazyLoadEvent.conditions = [new JfCondition('isSection', 1)]
    lazyLoadEvent.additional = [new JfCondition('cp', this.mApi.show())]
    lazyLoadEvent.multiSortMeta = [new JfSort('orderInMenu', JfSort.asc)]
    lazyLoadEvent.includes = [{subMenus: ['actions']}]
    lazyLoadEvent.rows = -1

    this.crudService.getPage(k.routes.permissions, lazyLoadEvent).subscribe({
      next: (resp) => (this.permissionAll = resp.data.content),
      error: (error) => this.messageService.danger(k.project_name, error, 'Permisos'),
    })
  }

  permissionSelected(permission: Permission, all: boolean = false): void {
    const exist = this.role.permissions.find((p) => p.id === permission.id) !== undefined ///> 0;
    if (exist) {
      // remove
      this.role.permissions = this.role.permissions.filter((obj) => obj.id !== permission.id)
      if (all) {
        // permission parent
        const p = this.permissionAll.find((mP) => mP.id === permission.id)
        if (p) {
          // subMenus of permission parent
          p.subMenus?.forEach((m) => {
            this.role.permissions = this.role.permissions.filter((p01) => p01.id !== m.id)
            // actions of subMenus
            m.actions?.forEach((a) => (this.role.permissions = this.role.permissions.filter((p02) => p02.id !== a.id)))
          })
        }
      }
    } else {
      // add
      this.role.permissions.push(permission)
      if (all) {
        const p = this.permissionAll.find((mP) => mP.id === permission.id)
        if (p) {
          p.subMenus?.forEach((m) => {
            this.role.permissions.push(m)
            m.actions?.forEach((a) => this.role.permissions.push(a))
          })
        }
      }
    }
    // console.log('this.role.permissions', this.role.permissions);
    this.update2permission()
  }

  permissionIsSelected(permission: Permission): boolean {
    // console.log('this.role', this.role)
    if (this.role.permissions) {
      const b = this.role.permissions.find((p) => p.id === permission.id) !== undefined ///> 0;
      // console.log('id:', id, ' b', b);
      return b
    }
    return false
    // $event.binary = true
  }

  update2permission(): void {
    this.roleIdsPermissionStr = this.role.permissions.map((p) => p.id).join(',')
  }
}
