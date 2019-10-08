import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
   }

   async onSubmit(form: NgForm) {

     const loading = await this.loadingController.create({
      keyboardClose: true,
      message: 'Por Favor Espere ...',
      duration: 1000
       });
     await loading.present();

     this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
     this.loginForm.reset();
     const { role, data } = await loading.onDidDismiss();
   }
  }
