import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedToolbarComponent } from './fixed-toolbar.component';

describe('FixedToolbarComponent', () => {
  let component: FixedToolbarComponent;
  let fixture: ComponentFixture<FixedToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
