import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { LoginConfirmComponent } from './login-confirm/login-confirm.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent},
  { path: "list-clients", component: ListClientsComponent },
  { path: "confirm", component: LoginConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
