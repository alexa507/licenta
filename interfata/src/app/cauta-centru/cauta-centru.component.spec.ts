import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautaCentruComponent } from './cauta-centru.component';

describe('CautaCentruComponent', () => {
  let component: CautaCentruComponent;
  let fixture: ComponentFixture<CautaCentruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CautaCentruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CautaCentruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
