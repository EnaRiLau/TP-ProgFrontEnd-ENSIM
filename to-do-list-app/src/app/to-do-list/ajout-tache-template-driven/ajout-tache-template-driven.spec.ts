import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTacheTemplateDriven } from './ajout-tache-template-driven';

describe('AjoutTacheTemplateDriven', () => {
  let component: AjoutTacheTemplateDriven;
  let fixture: ComponentFixture<AjoutTacheTemplateDriven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutTacheTemplateDriven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutTacheTemplateDriven);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
