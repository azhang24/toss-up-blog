import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TrendingNewsComponent } from './trending-news/trending-news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ShowBlogsComponent } from './show-blogs/show-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrendingNewsComponent,
    AllNewsComponent,
    AddBlogComponent,
    ShowBlogsComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlatpickrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
