import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfessionnalComponent } from './new-professionnal.component';

describe('NewProfessionnalComponent', () => {
  let component: NewProfessionnalComponent;
  let fixture: ComponentFixture<NewProfessionnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProfessionnalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfessionnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
