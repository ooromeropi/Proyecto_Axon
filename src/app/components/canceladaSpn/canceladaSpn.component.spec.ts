import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceladaSpnComponent } from '../canceladaSpn/canceladaSpn.component';

describe('CanceladaSpnComponent', () => {
  let component: CanceladaSpnComponent;
  let fixture: ComponentFixture<CanceladaSpnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanceladaSpnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceladaSpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
