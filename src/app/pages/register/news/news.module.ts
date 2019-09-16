import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ThfModule } from '@totvs/thf-ui';
import { NewsPage } from './news.page';
import { PipeModule } from 'src/app/pipe/PipeModule';


const routes: Routes = [
  {
    path: '',
    component: NewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThfModule,
    PipeModule.forRoot(),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
