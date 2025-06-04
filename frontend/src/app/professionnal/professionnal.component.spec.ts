import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionnalComponent } from './professionnal.component';

describe('ProfessionnalComponent', () => {
  let component: ProfessionnalComponent;
  let fixture: ComponentFixture<ProfessionnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionnalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
