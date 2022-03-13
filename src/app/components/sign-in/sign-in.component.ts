import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth,public router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
    this.router.navigate(['/signin'])
  }

  signOut(){
    this.afAuth.signOut();
  }

}
