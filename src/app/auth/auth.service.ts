import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  userId: string;

  constructor(private router: Router, private afAuth: AngularFireAuth, private alertCtrl: AlertController) { }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword( authData.email, authData.password)
      .then(result =>{
        this.authSuccessfully();
    })
      .catch(error => {
        this.alertCtrl.create({
          header: 'Error de Authenticación',
          message: 'Usuario o Contraseña incorrecto. Por Favor  verifique y trate de nuevo'
        })
          .then(alertEl => alertEl.present());
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
