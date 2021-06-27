import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetCardComponent } from './poet-card.component';

describe('PoetCardComponent', () => {
  let component: PoetCardComponent;
  let fixture: ComponentFixture<PoetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
