export class JfApiRoute {
  constructor(private rBase: string) {}
  index(value?: string): string {
    const rValue = value || this.rBase
    return `api.${rValue}.index`
  }
  show(value?: string): string {
    const rValue = value || this.rBase
    return `api.${rValue}.show`
  }
  store(value?: string): string {
    const rValue = value || this.rBase
    return `api.${rValue}.store`
  }
  update(value?: string): string {
    const rValue = value || this.rBase
    return `api.${rValue}.update`
  }
  destroy(value?: string): string {
    const rValue = value || this.rBase
    return `api.${rValue}.destroy`
  }
}
