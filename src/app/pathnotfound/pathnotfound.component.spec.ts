import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathnotfoundComponent } from './pathnotfound.component';

describe('PathnotfoundComponent', () => {
  let component: PathnotfoundComponent;
  let fixture: ComponentFixture<PathnotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathnotfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathnotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
