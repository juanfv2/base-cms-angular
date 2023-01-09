export class DBType {
  public name = ''
  public label = ''
  public field = ''
  public type = ''
  public allowExport = true
  public allowImport = true
  public table?: string
  public extra?: any
  public allowNull?: string
  public key?: string
  public defaultValue?: any
  public alias = ''
  public sorting = true

  constructor(public me?: DBType) {
    Object.assign(this, this.me)
    delete this.me
    // console.log({dbtype: this})
  }

  getFieldName() {
    const _field = this.field?.split('.') || ['']
    this.name = _field.length > 1 ? _field[1] : _field[0]
    // console.log({field: this.field})
    return this.name
  }
}
export class JfCondition {
  constructor(public c: string, public v?: any) {}
}

export class JfSort {
  static desc = -1
  static asc = 1
  constructor(public field: string, public order: number = -1) {}
}

export class JfSearchCondition {
  constructor(
    public cond = '=',
    public value: any = null,
    public field: any = '',
    public oper = 'AND',
    public table = ''
  ) {}
}

export class JfResponseList<E> {
  constructor(public totalPages: number, public totalElements: number, public content: E[]) {}
}

export interface JfResponse {
  success: boolean
  data: any
  message?: string
}

export class JfLazyLoadEvent {
  constructor(
    public rows: number = 10, // if -1 api returns without limit.
    public first: number = 1,
    public sorts?: JfSort[],
    public conditions?: any[],
    public joins?: JfCondition[],
    public additional?: JfCondition[],
    public includes?: any[],
    public select?: string[]
  ) {}
}

export class MyUtilsCustoms {
  static week = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  static months = [
    '-',
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
}
