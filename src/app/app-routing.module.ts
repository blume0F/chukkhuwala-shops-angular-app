import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { YourshopsComponent } from './yourshops/yourshops.component';

const routes: Routes = [
  {path:'signin',component:SignInComponent},
  {path:'myshops',component:YourshopsComponent},
  {path:'about',component:AboutComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addshop',component:DialogComponent,canActivate:[AuthGuard]},
  {path:'', redirectTo:'dashboard',pathMatch:'full'},
  {path:'**',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
