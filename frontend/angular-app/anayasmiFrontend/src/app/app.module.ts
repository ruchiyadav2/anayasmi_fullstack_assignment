import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'; // <-- added

import { ProgramService } from './services/program.service';
import { AuditService } from './services/audit.service';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service'; // <-- added
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ProgramListComponent,
    ProgramFormComponent,
    AuditLogComponent,
    LoginComponent,
    RegisterComponent // <-- added
  ],
  providers: [
    ProgramService,
    AuditService,
    AuthService,
    RegisterService // <-- added
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
