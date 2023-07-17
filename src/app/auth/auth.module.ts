import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './components/home/user-home/user-home.component';
import { OperatorHomeComponent } from './components/home/operator-home/operator-home.component';
import { AdminHomeComponent } from './components/home/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserHomeComponent,
    OperatorHomeComponent,
    AdminHomeComponent,
    HomeComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
