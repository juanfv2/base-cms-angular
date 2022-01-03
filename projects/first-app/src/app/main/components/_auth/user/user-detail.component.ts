import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {
  JfResponse,
  JfCondition,
  JfApiRoute,
  JfAuthService,
  JfCrudService,
  JfRequestOption,
  JfMessageService,
} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

import {User, Role, Person, XFile, Account} from 'projects/first-app/src/app/models/_models'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap'

const kRoute = k.routes.users

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @Output() saveClicked = new EventEmitter<User>()
  @Output() cancelClicked = new EventEmitter()

  @Input() user: User
  @Input() isSubComponentFrom = '-'
  @Input() isSubComponent = false

  labels = l
  includes = ['country', 'region', 'city', 'role', 'account', 'person', 'photo']
  mApi = new JfApiRoute(kRoute)
  private mSubscription: any
  sending = false
  hasPermission2new = false
  hasPermission2edit = false

  /**
   * Imagen:
   * - requerida
   * - sin color
   */
  private readonly photoUrl = {id: -1, entity: l.user.tableName, field: l.user.photo.field, entity_id: -1} as XFile
  uploaderPhotoUrl: any
  rolesSelected: Role[] = []
  rolesAvoidable: Role[] = []

  currentRole = 1
  currentPath: string
  currentLabels: any
  rolesAreRequired = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: JfAuthService,
    private crudService: JfCrudService,
    private messageService: JfMessageService,
    private parserFormatter: NgbDateParserFormatter
  ) {
    this.user = {} as User
    this.hasPermission2new = JfRequestOption.isAuthorized(`/${kRoute}/new`)
    this.hasPermission2edit = JfRequestOption.isAuthorized(`/${kRoute}/edit`) || this.hasPermission2new

    this.currentPath = this.route.snapshot.url[0].path
  }

  ngOnInit(): void {
    this.mSubscription = this.route.params.subscribe((params) => {
      const id = this.isSubComponent ? this.user?.id : params['id']
      // console.log('params', params, `\nthis.user`, this.user);
      this.newUser(this.user)
      if (id !== 'new') {
        this.getUser(id)
      }
    })
  }

  ngOnDestroy(): void {
    if (!this.isSubComponent && this.mSubscription) {
      this.mSubscription.unsubscribe()
    }
  }

  newUser(tempUser?: User): void {
    this.user = tempUser || ({} as User)
    delete this.user.id

    switch (this.currentPath) {
      case k.routes.accounts:
        this.user.account = {} as Account
        this.user.role = {id: k.role_id_customer} as Role
        this.currentLabels = this.labels.account
        break

      default:
        this.user.person = {} as Person
        this.currentLabels = this.labels.user
        break
    }
    // this.user.photo = this.photoUrl
    this.user.roles = []
    this.user.disabled = true
    this.update2roles('')
  }

  getUser(id: any): void {
    const mId = `${id}?includes=${JSON.stringify(this.includes)}`
    this.sending = true
    this.crudService.getEntity(kRoute, mId).subscribe({
      next: (resp: JfResponse) => {
        this.sending = false
        this.user = resp.data
        this.user.disabled = !this.user.disabled

        if (this.user.person) {
          this.user.person.birthDate = this.parserFormatter.parse(this.user.person.birthDate)
        }
        if (this.user.account) {
          this.user.account.birthDate = this.parserFormatter.parse(this.user.account.birthDate)
        }
        this.update2roles('')
      },
      error: (error: any) => {
        this.sending = false
        this.messageService.danger(k.project_name, error, this.labels.user.ownName)
      },
    })
  }

  onSave(): void {
    const modelTemp0 = JSON.parse(JSON.stringify(this.user))
    let info = {} as any

    switch (this.currentPath) {
      case k.routes.accounts:
        modelTemp0.withEntity = l.account.tableName
        info = modelTemp0.account
        break

      default:
        modelTemp0.withEntity = l.person.tableName
        info = modelTemp0.person
        break
    }
    const modelTemp = Object.assign(modelTemp0, info)
    let _date: any

    if (modelTemp.password) {
      modelTemp.password = modelTemp.password
      modelTemp.password_confirmation = modelTemp.password
    } else {
      delete modelTemp.password
      delete modelTemp.password_confirmation
    }
    if (modelTemp.birthDate) {
      _date = modelTemp.birthDate
      modelTemp.birthDate = `${_date.year}-${_date.month}-${_date.day}`
    }
    modelTemp.disabled = !modelTemp.disabled

    // prepare
    modelTemp.country_id = null
    if (modelTemp.country) {
      modelTemp.country_id = modelTemp.country.id
      delete modelTemp.country
    }
    modelTemp.region_id = null
    if (modelTemp.region) {
      modelTemp.region_id = modelTemp.region.id
      delete modelTemp.region
    }
    modelTemp.city_id = null
    if (modelTemp.city) {
      modelTemp.city_id = modelTemp.city.id
      delete modelTemp.city
    }
    modelTemp.role_id = null
    if (modelTemp.role) {
      modelTemp.role_id = modelTemp.role.id
      delete modelTemp.role
    }
    modelTemp.roles = modelTemp.roles ? modelTemp.roles.map((item: any) => item.id) : []
    // modelTemp.includes = this.includes;

    delete modelTemp.person
    delete modelTemp.account

    // prepare
    this.sending = true
    this.crudService.updateEntity(kRoute, modelTemp).subscribe({
      next: (resp: JfResponse) => {
        this.sending = false
        this.user.id = resp.data.id

        if (this.uploaderPhotoUrl) {
          this.photoUrl.entity_id = this.user.id
          this.user.photo = this.photoUrl
          setTimeout(() => {
            this.sending = true
            this.uploaderPhotoUrl.uploadAll()
          }, 100)
        }

        setTimeout(() => {
          this.messageService.success(k.project_name, 'Guardado')
          if (this.isSubComponent) {
            // ?? this.saveClicked.emit(this.user);
          } else {
            this.router.navigate([this.currentPath, this.user.id])
          }
        }, 200)
      },
      error: (error: any) => {
        console.log('error', error)
        this.sending = false
        this.messageService.danger(k.project_name, error, this.labels.user.ownName)
      },
    })
  }

  addNew(): void {
    this.user.photo = {} as XFile
    setTimeout(() => {
      this.newUser()
      this.router.navigate([this.currentPath, 'new'])
    }, 100)
  }

  onBack(): void {
    if (this.isSubComponent) {
      this.cancelClicked.emit('cancel')
      return
    }

    this.router.navigate([this.currentPath])
  }

  // for files

  onFinishUploadFile(condition: JfCondition): void {
    // console.log('condition', condition);
    switch (condition.c) {
      case this.labels.user.photo.field:
        this.user.photo = condition.v as XFile
        this.uploaderPhotoUrl = null

        this.authService.currentUser.subscribe((u) => {
          if (u.id === this.user.id) {
            u.photo = this.user.photo
          }
        })
        break
      // case 'images':
      //   this.person.images.push(condition.value as XFile);
      //   break;
      default:
        break
    }
  }

  uploaderQueue(condition: JfCondition): void {
    // console.log('condition', condition);
    switch (condition.c) {
      case this.labels.user.photo.field:
        this.uploaderPhotoUrl = condition.v
        break
      // case 'images':
      //   this.uploaderImages = condition.value;
      //   break;
      default:
        console.log('???', condition.c)
        break
    }
  }

  // ? m2m
  update2roles($e: any): void {
    this.user.roles = this.user.roles || []
    // do: something like that?
    // this.rolesAreRequired   = this.user.roles.length > 0 ? '-' : '';
    // this.avoidableRoles  = [...new Set([...k.userClients, ...this.selectableRoles])];

    if (this.user.person) {
      this.rolesAreRequired = this.user.roles.length > 0 ? '-' : ''
      this.rolesSelected = this.user.roles
      this.rolesAvoidable = this.rolesSelected
      const noRoles = k.rolesClients
      this.rolesAvoidable = [...new Set([...noRoles, ...this.rolesAvoidable])]
    }
  }

  rm2role(role: Role): void {
    this.user.roles = this.user.roles.filter((r: any) => r.id !== role.id)
    // this.update2roles('');
  }

  go2role(role: Role): void {
    this.router.navigate([k.routes.roles, role.id])
  }
}
