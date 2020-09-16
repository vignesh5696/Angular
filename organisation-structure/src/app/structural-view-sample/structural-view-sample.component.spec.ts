import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralViewSampleComponent } from './structural-view-sample.component';

describe('StructuralViewSampleComponent', () => {
  let component: StructuralViewSampleComponent;
  let fixture: ComponentFixture<StructuralViewSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralViewSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuralViewSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
