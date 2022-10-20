export class DBType {
  constructor(
    public label: string,
    public field?: string,
    public type?: string,
    public allowExport = true,
    public allowImport = true,
    public table?: string,
    public allowNull?: string,
    public key?: string,
    public defaultValue?: any,
    public extra?: string
  ) {}
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
