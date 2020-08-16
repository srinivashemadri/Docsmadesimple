import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdocComponent } from './newdoc.component';

describe('NewdocComponent', () => {
  let component: NewdocComponent;
  let fixture: ComponentFixture<NewdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
