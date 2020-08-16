import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsharedComponent } from './viewshared.component';

describe('ViewsharedComponent', () => {
  let component: ViewsharedComponent;
  let fixture: ComponentFixture<ViewsharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
