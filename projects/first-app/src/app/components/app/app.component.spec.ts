import {TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {ServiceWorkerModule, SwUpdate, VersionEvent} from '@angular/service-worker'
import {AppComponent} from './app.component'
import {Observable, Subject} from 'rxjs'
import {BaseCmsModule} from 'base-cms'

export class SwUpdateServerMock {
  public versionUpdates!: Observable<VersionEvent>
  public isEnabled: boolean = false

  public checkForUpdate(): Promise<void> {
    return new Promise((resolve) => resolve())
  }
  public activateUpdate(): Promise<void> {
    return new Promise((resolve) => resolve())
  }
}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ServiceWorkerModule, BaseCmsModule],
      declarations: [AppComponent],
      providers: [{provide: SwUpdate, useClass: SwUpdateServerMock}],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should have router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent)

    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull()
  })
  // it(`should have as title 'safe-drive'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('safe-drive');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('safe-drive app is running!');
  // });
})
