import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingNewsComponent } from './trending-news/trending-news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { AddBlogComponent } from './add-blog/add-blog.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trendingnews', component: TrendingNewsComponent},
  {path: 'allnews', component: AllNewsComponent},
  {path: 'addblog', component: AddBlogComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
