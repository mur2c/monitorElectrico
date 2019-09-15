import { Injectable } from '@angular/core';
import { AngularFireAuth } from  '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  userId: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword( authData.email, authData.password)
      .then(result =>{
        this.authSuccessfully();
    })
      .catch(error => {
        console.log(error);
    });
  }

private authSuccessfully() {
  this.isAuthenticated = true;
  this.router.navigate(['/home']);
  }

  isAuth() {
    return this.isAuthenticated;
  }



}
