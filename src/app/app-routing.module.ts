import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { LoginComponent } from './components/login-component/login.component';
import { RegisterComponent } from './components/register-component/register.component';
import { ProfileComponent } from './components/profile-component/profile.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { AdministrateCompanyComponent } from './components/administrate-company/administrate-company.component';
import { CreateTravelComponent } from './components/create-travel/create-travel.component';
import { CreateTravelGurad } from './auth/create-travel.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'create-company',
    component: CreateCompanyComponent
  }, 
  {
    path: 'admin-company',
    component: AdministrateCompanyComponent
  },
  {
    path: 'create-travel',
    component: CreateTravelComponent,
    canActivate: [CreateTravelGurad]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}