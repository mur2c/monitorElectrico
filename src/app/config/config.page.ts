import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from  '@angular/fire/auth';
import { ItemService } from 'src/app/services/item.service';
import { LoadingController } from '@ionic/angular';
import { TaskI } from '../auth/task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  public form: FormGroup;
  items: Observable<any>;
  todoId= null;

  // Variables emp,suc Will be loaded empty, unless a parameter is sent  "this.route.snapshot.params['id']"  check ngOninit
  todo: TaskI = {     
    emp: '',
    suc: '',
   };
   localidad = "Sucursal o Localidad";
   usuario = "Empresa o Usuario"
   ident = "Id del Dispositivo";


  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, private afAuth: AngularFireAuth, private itemservice: ItemService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId){                                   // true When edit button is clicked
      this.loadTodo();
    }
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();
 
    if (this.todoId) {
      this.itemservice.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.router.navigate(['/home']);
      });
    } else {
      this.itemservice.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.router.navigate(['/home']);
      });
    }
  }

/** Go Back */
  gotoHome() {
    this.router.navigate(['/home']);
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Cargando....',
    });
    await loading.present();

    this.itemservice.getTodo(this.todoId).subscribe( todos =>{
      loading.dismiss();
      this.todo = todos;
    })
  }

}
