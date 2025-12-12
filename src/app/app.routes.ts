import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewApproverProfileComponent } from './view-approver-profile/view-approver-profile.component';
import { UpdateApproverProfileComponent } from './update-approver-profile/update-approver-profile.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  // ✅ Default route → homepage
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },

  // ✅ Public routes
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  // ✅ Protected routes
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ViewApproverProfileComponent, canActivate: [AuthGuard] },
  { path: 'updateprofile', component: UpdateApproverProfileComponent, canActivate: [AuthGuard] },

  // ✅ Wildcard → homepage
  { path: '**', redirectTo: 'homepage' }
];
