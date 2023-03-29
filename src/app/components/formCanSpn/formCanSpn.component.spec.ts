import { ComponentFixture, TestBed } from '@angular/core/testing';

import { formCanSpnComponent } from './formCanSpn.component';

describe('FormComponent', () => {
  let component: formCanSpnComponent;
  let fixture: ComponentFixture<formCanSpnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ formCanSpnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(formCanSpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
