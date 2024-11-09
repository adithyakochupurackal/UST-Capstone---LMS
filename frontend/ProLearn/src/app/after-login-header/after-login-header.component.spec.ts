import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginHeaderComponent } from './after-login-header.component';

describe('AfterLoginHeaderComponent', () => {
  let component: AfterLoginHeaderComponent;
  let fixture: ComponentFixture<AfterLoginHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterLoginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
