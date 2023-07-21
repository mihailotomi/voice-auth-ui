import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHourThumbnailComponent } from './working-hour-thumbnail.component';

describe('WorkingHourThumbnailComponent', () => {
  let component: WorkingHourThumbnailComponent;
  let fixture: ComponentFixture<WorkingHourThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingHourThumbnailComponent]
    });
    fixture = TestBed.createComponent(WorkingHourThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
