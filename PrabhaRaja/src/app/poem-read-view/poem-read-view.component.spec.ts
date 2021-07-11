import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemReadViewComponent } from './poem-read-view.component';

describe('PoemReadViewComponent', () => {
  let component: PoemReadViewComponent;
  let fixture: ComponentFixture<PoemReadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoemReadViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemReadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
