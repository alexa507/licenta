import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeautorizatComponent } from './neautorizat.component';

describe('NeautorizatComponent', () => {
  let component: NeautorizatComponent;
  let fixture: ComponentFixture<NeautorizatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeautorizatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeautorizatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
