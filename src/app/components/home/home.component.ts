import { Component } from '@angular/core';
import { Role } from '../../auth/enums/role';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
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