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
    this.blogService.getBlogByNewsID(this.newsArticle.id).subscribe((res: any) => {
      console.log(res)
      this.blogs = res;
    })
  }

}
