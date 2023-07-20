import { Component } from '@angular/core';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [ProfileDropdownComponent],
})
export class NavbarComponent {}
