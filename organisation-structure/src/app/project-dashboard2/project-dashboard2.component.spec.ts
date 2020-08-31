import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboard2Component } from './project-dashboard2.component';

describe('ProjectDashboard2Component', () => {
  let component: ProjectDashboard2Component;
  let fixture: ComponentFixture<ProjectDashboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDashboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
