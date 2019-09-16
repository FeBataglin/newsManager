import { Injectable } from '@angular/core';
import { Upload } from '../../models/upload'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'

@Injectable()
export class UploadService {

    constructor(private db: AngularFireDatabase) {

    }

    private basePath: string = '/uploads'
    private uploadTask: firebase.storage.UploadTask;

    pushUpload(upload: Upload) {
        let storageRef = firebase.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                console.log(error)
            },
            () => {
                upload.url = this.uploadTask.snapshot.downloadURL
                upload.name = upload.file.name
                this.saveFileData(upload)
            })
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name)
            })
            .catch(error => console.log(error));
    }

    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    private deleteFileStorage(name: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete()
    }
}