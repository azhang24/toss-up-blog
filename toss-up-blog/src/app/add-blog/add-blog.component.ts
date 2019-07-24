import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { News } from '../models/news';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  newsArticle: News;

  constructor() { }

  ngOnInit() {
    delete window.history.state.navigationId;
    this.newsArticle = window.history.state
    console.log(this.newsArticle);
  }

}
