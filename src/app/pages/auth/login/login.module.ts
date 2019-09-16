import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { ThfModule } from '@totvs/thf-ui';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThfModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
  entryComponents: []
})

export class LoginPageModule {}
