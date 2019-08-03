import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-show-blogs',
  templateUrl: './show-blogs.component.html',
  styleUrls: ['./show-blogs.component.css']
})
export class ShowBlogsComponent implements OnInit {

  newsArticle: News;

  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    delete window.history.state.navigationId;
    this.newsArticle = window.history.state
    console.log(this.newsArticle);
    this.getBlogs()
  }

  getBlogs(){
    this.blogService.getBlogByNewsID(this.newsArticle.id).subscribe((res: Blog[]) => {
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
      
      this.blogs = this.blogs.reverse();
    })
  }
  
  deleteBlog(blog: Blog){
    this.blogs = this.blogs.filter(blogPost => blogPost != blog)
    this.blogService.deleteBlog(blog).subscribe();
  }

}
