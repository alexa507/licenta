import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaPaginaAdminComponent } from './prima-pagina-admin.component';

describe('PrimaPaginaAdminComponent', () => {
  let component: PrimaPaginaAdminComponent;
  let fixture: ComponentFixture<PrimaPaginaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaPaginaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaPaginaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
