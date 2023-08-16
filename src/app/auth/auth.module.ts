import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './components/login/admin-login/admin-login.component';

@NgModule({
  declarations: [LoginComponent, AdminLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
