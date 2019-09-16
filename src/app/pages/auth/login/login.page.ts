import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user';
import * as firebase from 'firebase';
import { ThfNotificationService } from '@totvs/thf-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailTooltip: string;
  user = {} as User;
  loginForm: FormGroup;
  toast: any; 

  constructor(
    private formBuilder: FormBuilder, 
    private thfNotification: ThfNotificationService,
    private router: Router
  ) { 
    this.createLoginForm();
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.emailTooltip = 'Totvs email provided on the registration form';
  }
  
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  loginUser(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
          this.router.navigate(['news']);
    })
    .catch((error) => {
      this.thfNotification.error('Por favor, verifique seu login/senha.')
    })
  }

}