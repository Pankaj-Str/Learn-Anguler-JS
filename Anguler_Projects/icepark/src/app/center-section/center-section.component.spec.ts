import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSectionComponent } from './center-section.component';

describe('CenterSectionComponent', () => {
  let component: CenterSectionComponent;
  let fixture: ComponentFixture<CenterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
