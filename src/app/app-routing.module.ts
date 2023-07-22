import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { Role } from './auth/enums/role';
import { AdminLoginComponent } from './auth/components/login/admin-login/admin-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: [Role.ADMIN, Role.OPERATOR, Role.USER],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
