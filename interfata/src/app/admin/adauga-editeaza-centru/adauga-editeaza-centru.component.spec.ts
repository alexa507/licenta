import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugaEditeazaCentruComponent } from './adauga-editeaza-centru.component';

describe('AdaugaEditeazaCentruComponent', () => {
  let component: AdaugaEditeazaCentruComponent;
  let fixture: ComponentFixture<AdaugaEditeazaCentruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugaEditeazaCentruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaugaEditeazaCentruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
