import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleViewStructure2Component } from './sample-view-structure2.component';

describe('SampleViewStructure2Component', () => {
  let component: SampleViewStructure2Component;
  let fixture: ComponentFixture<SampleViewStructure2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleViewStructure2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleViewStructure2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
