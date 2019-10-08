import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Item } from 'src/app/auth/item.model';
import { TaskI } from '../auth/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated: boolean;
  items: Observable<any>;      // import model Item
  // todos: Observable<TaskI[]>;
  todos: any;
  userId: string;

  constructor(private router: Router,
              private authService: AuthService,
              private db: AngularFirestore ,
              private itemservice: ItemService,
              private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  ionViewWillEnter () {
    this.itemservice.getTodos().subscribe((todo) =>{
      this.todos = todo;
    })
  }

  onLogout() {
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  gotoConfig() {
    this.router.navigate(['/config']);
  }

  onEdit(idInv: string, slidingItem: IonItemSliding) {
    slidingItem.close();  // Close swipeable menu
    this.router.navigateByUrl('/config/' + idInv);
  }

  onRemove(idTask: string){
    this.itemservice.removeTodo(idTask);
  }

  onVer(idInv: string, slidingItem: IonItemSliding) {
    slidingItem.close();  // Close swipeable menu
    this.router.navigateByUrl('/viewconfig/' + idInv);
  }

}
