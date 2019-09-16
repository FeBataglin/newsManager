import { Injectable } from '@angular/core';
import { User } from './../../models/user';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject({ user: null, key: '' });
  currentUser = this.userSource.asObservable();

  constructor(private db: AngularFireDatabase) { }

  changeUser(user: User, key: string) {
    this.userSource.next({ user: user, key: key });
  }

delete(key: string) {
  this.db.object(`user/${key}`).remove();
}

}
