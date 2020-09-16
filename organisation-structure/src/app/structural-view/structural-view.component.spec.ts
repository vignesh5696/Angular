import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralViewComponent } from './structural-view.component';

describe('StructuralViewComponent', () => {
  let component: StructuralViewComponent;
  let fixture: ComponentFixture<StructuralViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuralViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
