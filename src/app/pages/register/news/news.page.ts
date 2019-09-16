import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThfNotificationService, ThfMenuItem } from '@totvs/thf-ui';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news/news.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload/upload';
import * as firebase from 'firebase';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})

export class NewsPage implements OnInit {

  ngOnInit() {
  }

  selectedFiles: FileList;
  currentUpload: Upload;
  public news;
  newsForm: FormGroup;
  menuItemSelected: string;
  imageName: string;
  imageSource;
  newsImage;
  imageUpload;

  menus: Array<ThfMenuItem> = [
    {
      label: 'Selecionar segmento', icon: 'thf-icon thf-icon-news', shortLabel: 'Segmentos', subItems: [
        { label: 'Ensino Médio' },
        { label: 'Cursos Técnicos' },
        { label: 'Cursos Superiores' },
        { label: 'Bolsas' },
        { label: 'Eventos' },
        { label: 'Mundo SENAI' }
      ]
    },
    { label: 'Desconectar-se', icon: 'thf-icon thf-icon-exit', shortLabel: 'Desconectar-se' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private db: NewsService,
    private upSvc: UploadService,
    private thfNotification: ThfNotificationService) {

    this.news = this.db.getAll();
    this.getPhotoUrl();
    this.news = this.news || {};
    this.createNewsForm();
  }

  detectedFiles(event) {
    this.selectedFiles = event.target.files;
    this.thfNotification.success("Imagem selecionada - " + this.selectedFiles.item(0).name + ".");
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }

  printMenuAction(menu: ThfMenuItem) {
    this.menuItemSelected = menu.label;
  }

  getPhotoUrl() {
    firebase.storage().ref().child('uploads/' + this.imageSource).getDownloadURL().then((url) => {
      this.newsImage = url;
    })
  }

  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      key: [this.news.key],
      video: [this.news.video],
      image: [this.news.image],
      title: [this.news.title, Validators.required],
      resume: [this.news.resume, Validators.required],
      document: [this.news.document, Validators.required],
      segment: [this.news.segment, Validators.required],
    });
  }

  registerNews(news: News) {

    if (this.newsForm.valid) {
      if (this.news.video != "" && this.news.image != "") {
        this.thfNotification.error("Não é permitido a inclusão de uma URL do vídeo junto com imagem em anexo.");
      } else if (this.news.video == "" && this.news.image == "") {
        this.thfNotification.error("Preencha o campo URL do vídeo ou selecione uma imagem.")
      } else {
        this.db.save(this.newsForm.value)
          .then(async () => {
            this.uploadSingle();
            this.thfNotification.success('Novidade salva com sucesso.');
          })
          .catch((e) => {
            this.thfNotification.error('Erro ao salvar novidade.');
            console.error(e);
          })
      }
    }
  }

  deleteNews(key: string) {
    this.db.delete(key);
    this.thfNotification.success('Novidade removida com sucesso.');
  }

}
