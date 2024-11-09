import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
