import {JfCondition} from './classes'

const baseFrontEnd = 'stage/admin'
const baseBackEnd = 'stage'
const sBaseBackEnd = `/${baseBackEnd}`

export const routes = {
  countries: 'countries',
  regions: 'regions',
  cities: 'cities',

  /* -------------------------------------------------------------------------- */
  /* auth                                                                       */
  /* -------------------------------------------------------------------------- */
  login: 'login',
  logout: 'logout',
  roles: 'roles',
  users: 'users',
  accounts: 'accounts',
  permissions: 'permissions',

  frontEnd: {
    name: 'admin',
    root: '/admin/',
  },
  backEnd: {
    name: '',
    root: '/',
    sRoot: '',
    assets: `/storage/assets/`,
  },
  api: 'api/',
  misc: {
    importCsv: 'import-csv',
    exportCsv: 'export-csv',
    file: 'file/',
    xFiles: 'x_files',
    seeder: 'seeder',
    subscribe: 'subscribe',
    bulkErrors: 'bulk_errors',
  },
}

export const exportFileTypes = [new JfCondition('csv', 'CSV'), new JfCondition('xlsx', 'XLSX')]

export const jfTemplateAutoComplete = `
<div class="form-group position-relative">
  <label for="{{ acId }}-entity-typeahead">{{ acName }}:</label>
  <ng-template
    #rt
    let-r="result"
    let-t="term"
  >
    {{ formatter | jfFormatItem: r }}
  </ng-template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      id="{{ acId }}-entity-typeahead"
      name="{{ acId }}-entity-typeahead"
      [class.bad-value]="searchFailed"
      [placeholder]="'Escriba para filtrar...'"
      [disabled]="acDisabled"
      [editable]="false"
      [inputFormatter]="formatter"
      [resultTemplate]="rt"
      (selectItem)="select($event)"
      (focus)="focus.next($any($event).target.value)"
      #instance="ngbTypeahead"
      [(ngModel)]="value"
      [ngbTypeahead]="search"
    />

    @if (value && !acDisabled) {
      <button
        title="Limpiar"
        class="btn btn-outline-danger m-0"
        (click)="actClear()"
        type="button"
      >
        <i class="fa fa-times text-white"></i>
      </button>
    }

    @if(value && hasPermission2show) {
      <button
        title="Ver detalle"
        class="btn btn-outline-info m-0"
        (click)="actGo2Detail()"
        type="button"
      >
        <i class="fa fa-info text-white"></i>
      </button>
    }
  </div>
  @if (searching) {
    <base-cms-spinner-searching />
  }
  @if (searchFailed) {
    <div class="invalid-feedback">Lo sentimos, las sugerencias no se pudieron cargar.</div>
  }
</div>

`
