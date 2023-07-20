import { Component } from '@angular/core';
import { Role } from '../../auth/enums/role';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user';
import { UserHomeComponent } from './user-home/user-home.component';
import { OperatorHomeComponent } from './operator-home/operator-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

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
    CommonModule,
  ],
})
export class HomeComponent {
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = authService.currentUser$;
  }

  public get Role(): typeof Role {
    return Role;
  }
}
