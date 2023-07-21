import { Component, Input } from '@angular/core';
import { WorkingHours } from '../../models/working-hours';

@Component({
  selector: 'app-working-hour-thumbnail',
  templateUrl: './working-hour-thumbnail.component.html',
  styleUrls: ['./working-hour-thumbnail.component.scss'],
})
export class WorkingHourThumbnailComponent {
  months = [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar',
  ];
  @Input('working-hours') workingHours?: WorkingHours;

  constructor() {}

  getMonthName(monthNum: any) {
    return this.months[monthNum];
  }
}
