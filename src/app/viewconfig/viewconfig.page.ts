import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskI } from 'src/app/auth/task';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ItemService } from 'src/app/services/item.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-viewconfig',
  templateUrl: './viewconfig.page.html',
  styleUrls: ['./viewconfig.page.scss'],
})
export class ViewconfigPage implements OnInit {
  configId: any;

  items: Observable<any>;
  todoId = null;

  // Variables emp,suc Will be loaded empty, unless a parameter is sent  "this.route.snapshot.params['id']"  check ngOninit
  todo: TaskI = {
    emp: '',
    suc: '',
    disp: '',
    sensor: '',
    cap: '',
    model: '',
    vent: '',
    vsal: '',
    batmarca: '',
    batcap: '',
    batcant: '',
    batconf: '',
   };
   usuario = 'Empresa o Usuario';
   localidad = 'Sucursal o Localidad';
   dispositivo = 'Equipo a Monitorear';
   sensorid = 'Id del Dispositivo o Sensor';
   eqCap = 'Capacidad del Inversor';
   eqModel = 'Modelo o Marca';
   vEnt = 'Voltaje de Entrada';
   vSal = 'Voltaje de Salida';
   batMarca = 'Marca de la Bateria';
   batCap = 'Capacidad de las Baterias';
   batCant = 'Cantidad de Bateria';
   batConf = 'Serie o Paralelo';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private itemservice: ItemService,
              public loadingController: LoadingController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.configId = this.route.snapshot.params['id'];
    if (this.configId){                                   // true When edit button is clicked
      this.loadTodo();
    }
    console.log(this.configId);
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

    this.itemservice.getTodo(this.configId).subscribe( todos =>{
      loading.dismiss();
      this.todo = todos;
    })
  }

}





