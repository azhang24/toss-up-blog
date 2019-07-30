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
          id: this.createObjectId(res[i].id),
          title: res[i].title,
          body: res[i].body,
          publicationDate: res[i].publicationDate,
          newsID: res[i].newsID
        })
      }

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

  createObjectId(id: any){
    let timestamp = id.timestamp.toString(16);
    let machineid = id.machineIdentifier.toString(16);
    let processid = id.processIdentifier.toString(16);
    if(processid.length < 4){
      let leadingzeros = '0'.repeat(4 - processid.length)
      processid = leadingzeros + processid
    }
    let counter = id.counter.toString(16);
    let objId = timestamp + machineid + processid + counter + "";
    return objId;
  }
  
}
