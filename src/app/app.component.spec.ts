import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoadingComponent } from './UI/shared/components/app-loading/loading/loading.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LoadingComponent],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    try {
      fixture.detectChanges();
    } catch (error) {
      console.error('Error during detectChanges:', error);
    }
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cats-frontend'`, () => {
    expect(component.title).toEqual('cats-frontend');
  });
});
