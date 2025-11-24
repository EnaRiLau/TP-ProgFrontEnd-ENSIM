import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTacheReactiveForms } from './ajout-tache-reactive-forms';

describe('AjoutTacheReactiveForms', () => {
  let component: AjoutTacheReactiveForms;
  let fixture: ComponentFixture<AjoutTacheReactiveForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutTacheReactiveForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutTacheReactiveForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
