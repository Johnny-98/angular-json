import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProperyDetailsComponent } from './propery-details.component';

describe('ProperyDetailsComponent', () => {
  let component: ProperyDetailsComponent;
  let fixture: ComponentFixture<ProperyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProperyDetailsComponent]
    });
    fixture = TestBed.createComponent(ProperyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
