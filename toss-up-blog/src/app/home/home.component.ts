import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { News } from '../models/news';
import { BlogService } from '../services/blog.service';
import { NewsService } from '../services/news.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Blog[];

  newsArticles: News[];

  constructor(private blogService: BlogService, private newsService: NewsService) { 

    //temporary
    this.blogs = [];
    this.newsArticles = [];

  }

  ngOnInit() {
    this.getBlogs();
    this.getUSNews();
  }

  getBlogs(){
    this.blogService.getBlogs().subscribe((res: Blog[]) => {
      for(let i = 0; i < res.length; i++){
        this.blogs.push({
          id: this.blogService.createObjectId(res[i].id),
          title: res[i].title,
          body: res[i].body,
          publicationDate: res[i].publicationDate,
          updateDate: res[i].updateDate,
          newsID: res[i].newsID
        })
      }
      this.blogs = this.blogs.reverse()

    })
  }

  getUSNews(){
    this.newsService.getTrendingNewsByCountry('us').subscribe((res: any) => {
      for(let i = 0; i < res.articles.length; i++){
        let article = res.articles[i];
        this.newsArticles.push({
          title: article.title,
          source: article.source.name,
          url: article.url,
          author: article.author,
          publishedAt: new Date(article.publishedAt).toString(),
          id: this.newsService.generateId(article.url)
        });
      }
    })
  }

  deleteBlog(blog: Blog){
    this.blogs = this.blogs.filter(blogPost => blogPost != blog)
    this.blogService.deleteBlog(blog).subscribe();
  }
  
}
