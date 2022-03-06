import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:'signin',component:SignInComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addshop',component:DialogComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
