import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth,  } from  '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../auth/task';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {

  todosCollection: AngularFirestoreCollection<TaskI>;
  todos: Observable<TaskI[]>;
  userId: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
      console.log(this.userId);
      this.showData2()
      })
  }

  ngOnInit() {
    this.showData2()
  }

  showData2() {
    this.todosCollection = this.db.collection<TaskI>(this.userId);
    this.todos = this.todosCollection.snapshotChanges().pipe(
     map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id, ...data};
       });
     })
   );
  // console.log(this.todos);
 }

  getTodos(){
    return of(this.todos);     //Return the observable must use 'of'
 }

  getTodo(id: string){         //load user dev data for modification
    return this.todosCollection.doc<TaskI>(id).valueChanges();
  }

  addTodo(todo: TaskI){
    return this.todosCollection.add(todo);
  }

  updateTodo(todo:TaskI, id: string){
    return this.todosCollection.doc(id).update(todo);
  }

  removeTodo(id: string){
    return this.todosCollection.doc(id).delete();
  }

}
