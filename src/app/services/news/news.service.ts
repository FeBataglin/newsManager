import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase } from "angularfire2/database";
import { News } from 'src/app/models/news';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private PATH = 'news/';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('date'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    })
  }

  insert(news: News) {
    this.db.list('news').push(news)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(news: News, key: string) {
    this.db.list('news').update(key, news)
      .catch((error: any) => {
        console.error(error);
      });
  }
 
  delete(key: string) {
    this.db.object(`news/${key}`).remove();
  }

  save(news: any) { 
    return new Promise((resolve, reject) => {
      if (news.key) {
        this.db.list(this.PATH)
          .update(news.key, {
            imageName: news.key,
            video: news.video,
            image: news.image.replace("C:\\fakepath\\", ""),
            title: news.title,
            resume: news.resume,
            document: news.document,
            segment: news.segment
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            key: news.key,
            video: news.video,
            image: news.image.replace("C:\\fakepath\\", ""),
            title: news.title,
            resume: news.resume,
            document: news.document,
            segment: news.segment
          })
          .then(() => resolve());
      }
    })
  }
}
