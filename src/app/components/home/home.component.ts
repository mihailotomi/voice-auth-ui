import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../../auth/enums/role';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../auth/models/user';
import { UserHomeComponent } from './user-home/user-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { WorkingHoursService } from 'src/app/working-hours/services/working-hours.service';
import { WorkingHours } from 'src/app/working-hours/models/working-hours';
import { WorkingHourThumbnailComponent } from 'src/app/working-hours/components/working-hour-thumbnail/working-hour-thumbnail.component';
import { WorkingHoursModule } from 'src/app/working-hours/working-hours.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    UserHomeComponent,
    OperatorHomeComponent,
    AdminHomeComponent,
    NavbarComponent,
    WorkingHoursModule,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User | null>;
  currentWorkingHours?: WorkingHours;
  workingHoursSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private whService: WorkingHoursService
  ) {
    this.currentUser$ = authService.currentUser$;
  }
  ngOnInit(): void {
    this.workingHoursSubscription = this.whService
      .getMyCurrent()
      .subscribe((workingHours) => (this.currentWorkingHours = workingHours));
  }
  ngOnDestroy(): void {
    (this.workingHoursSubscription as Subscription).unsubscribe();
  }

  public get Role(): typeof Role {
    return Role;
  }
}
