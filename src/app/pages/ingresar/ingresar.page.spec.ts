import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarPage } from './ingresar.page';

describe('LoginPage', () => {
  let component: IngresarPage;
  let fixture: ComponentFixture<IngresarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
