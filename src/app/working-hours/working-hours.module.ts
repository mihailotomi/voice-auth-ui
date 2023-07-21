import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingHourThumbnailComponent } from './components/working-hour-thumbnail/working-hour-thumbnail.component';

@NgModule({
  declarations: [WorkingHourThumbnailComponent],
  imports: [CommonModule],
  exports: [WorkingHourThumbnailComponent],
})
export class WorkingHoursModule {}
