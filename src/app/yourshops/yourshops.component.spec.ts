import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourshopsComponent } from './yourshops.component';

describe('YourshopsComponent', () => {
  let component: YourshopsComponent;
  let fixture: ComponentFixture<YourshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourshopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
