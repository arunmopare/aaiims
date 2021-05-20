;
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateAdminComponent } from './create-admin/create-admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'login-admin', pathMatch: 'full' },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'create-admin', component: CreateAdminComponent },


  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }