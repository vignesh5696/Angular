import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexoutletComponent } from './indexoutlet.component';

describe('IndexoutletComponent', () => {
  let component: IndexoutletComponent;
  let fixture: ComponentFixture<IndexoutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexoutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
