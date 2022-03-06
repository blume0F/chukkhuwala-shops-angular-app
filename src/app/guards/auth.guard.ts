import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseAuth:AngularFireAuth,private router:Router){}

 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree>{

      const user = await this.firebaseAuth.currentUser;
      const isAuthenticated = user ? true: false;

      if(!isAuthenticated){
        this.router.navigate(['signin'])
      }
      return isAuthenticated;
  }

}
