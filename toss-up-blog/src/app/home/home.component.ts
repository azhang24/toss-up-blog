import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { News } from '../models/news';
import { BlogService } from '../services/blog.service';
import { NewsService } from '../services/news.service';
declare var $: any;

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
    $('.ui.dropdown').dropdown();
  }

  getBlogs(){
    this.blogService.getBlogs().subscribe((res: Blog[]) => {
      for(let i = 0; i < res.length; i++){
        this.blogs.push({
          id: this.blogService.createObjectId(res[i].id),
          title: res[i].title,
          body: res[i].body,
          paragraphs: res[i].body.split('\n').filter((paragraph) => paragraph.length > 0),
          publicationDate: res[i].publicationDate,
          updateDate: res[i].updateDate !== null ? res[i].updateDate : res[i].publicationDate,
          newsID: res[i].newsID
        })
      }
      this.blogs = this.blogs.reverse()

    })
  }

  sortBlogs(option){
    console.log(this.blogs)
    if(option === "oldest"){
      this.blogs.sort((blog1, blog2) => 
        Date.parse(blog1.updateDate.toString()) - Date.parse(blog2.updateDate.toString()))
      console.log(this.blogs)
    }
    else if(option === "recent"){
      this.blogs.sort((blog1, blog2) => 
        Date.parse(blog2.updateDate.toString()) - Date.parse(blog1.updateDate.toString()))
    }
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
