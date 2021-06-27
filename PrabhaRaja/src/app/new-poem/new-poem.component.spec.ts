import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPoemComponent } from './new-poem.component';

describe('NewPoemComponent', () => {
  let component: NewPoemComponent;
  let fixture: ComponentFixture<NewPoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPoemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
