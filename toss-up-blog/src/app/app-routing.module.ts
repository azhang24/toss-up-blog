import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingNewsComponent } from './trending-news/trending-news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ShowBlogsComponent } from './show-blogs/show-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trendingnews', component: TrendingNewsComponent},
  {path: 'allnews', component: AllNewsComponent},
  {path: 'addblog/:id', component: AddBlogComponent},
  {path: 'showblog/:id', component: ShowBlogsComponent},
  {path: 'editblog/:id', component: EditBlogComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
