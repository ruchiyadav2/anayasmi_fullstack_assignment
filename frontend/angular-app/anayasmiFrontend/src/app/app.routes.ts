import { Routes } from '@angular/router';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: RegisterComponent },     // default = register
  { path: 'login', component: LoginComponent },   // ✔️ login route added
  { path: 'dashboard', component: ProgramListComponent, canActivate:[AuthGuard] },
  { path: 'add-program', component: ProgramFormComponent, canActivate:[AuthGuard] },
  { path: 'audit-log', component: AuditLogComponent ,canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
