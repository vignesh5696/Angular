import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboard3Component } from './project-dashboard3.component';

describe('ProjectDashboard3Component', () => {
  let component: ProjectDashboard3Component;
  let fixture: ComponentFixture<ProjectDashboard3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDashboard3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDashboard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
