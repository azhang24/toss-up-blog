import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { News } from '../models/news';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  newsArticle: News;

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    delete window.history.state.navigationId;
    this.newsArticle = window.history.state
    console.log(this.newsArticle);
  }

  submitBlog(){
    let blogTitle = (<HTMLInputElement>document.getElementById("blogTitle")).value;
    let blogBody = (<HTMLTextAreaElement>document.getElementById("blogBody")).value;

    let blogToAdd : Blog = {
      id: null,
      title: blogTitle,
      body: blogBody,
      paragraphs: blogBody.split('\n'),
      publicationDate: new Date(),
      updateDate: new Date(),
      newsID: this.newsArticle.id
    }

    console.log(blogToAdd.publicationDate)
    
    this.blogService.addBlog(blogToAdd).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('/')
    })
  }

}
