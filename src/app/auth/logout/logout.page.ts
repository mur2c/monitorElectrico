import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  isAuthenticated: boolean;

  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  //Call this Method every time this page is called
  ionViewWillEnter () {       
    this.presentAlert()
  }

    //Confirm method on exit
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Salir del Sistema',
        //subHeader: 'Subtitle',
        message: 'Estas seguro que deseas Salir del sistema ?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
              this.router.navigate(['/home']);
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Okay');
              this.isAuthenticated = false;
              this.router.navigate(['/login']);
              
            }
          }
        ]
      });
      await alert.present();
    } 




}
