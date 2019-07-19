import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import * as jQuery from 'jquery';
declare var $: any;
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  allNews: News[];

  sources: any[];

  constructor(private newsService: NewsService) { 
    this.allNews = [];
    this.sources = [];
  }

  ngOnInit() {
    $('.ui.selection.dropdown.language').dropdown();
    $('.ui.selection.dropdown.sortBy').dropdown();
    $('.ui.search.dropdown.sources').dropdown();
    this.newsService.getAllSources().subscribe((res: any) => {
      this.sources = res.sources;
    });
  }

  searchForAllNews(){
    let query = (<HTMLInputElement>document.getElementById("query")).value;
    let from = (<HTMLInputElement>document.getElementById("fromTime")).value;
    let to = (<HTMLInputElement>document.getElementById("toTime")).value;
    let language = $('.ui.selection.dropdown.language').dropdown('get value');
    let sortBy = $('.ui.selection.dropdown.sortBy').dropdown('get value');
    let sources = $('.ui.search.dropdown.sources').dropdown('get value');
    let domain = (<HTMLInputElement>document.getElementById('domain')).value;
    let exclude_domain = (<HTMLInputElement>document.getElementById('excludeDomain')).value;

    this.newsService.searchForAllNews(query, from, to, language, sortBy, sources, domain, exclude_domain)
        .subscribe((res: any) => {
          const articles = res.articles;
          this.allNews = articles.map((article) => {
            return {
              title: article.title,
              source: article.source.name,
              url: article.url,
              author: article.author != null ? article.author : '',
              publishedAt: new Date(article.publishedAt).toString(),
              id: this.urlToId(article.url)
            }
          })
          console.log(this.allNews);
        })
  }

  urlToId(url: string){
    let id = "";
    for(let i = 0; i < url.length; i++){
      let parsedChar = url.charAt(i).charCodeAt(0)
      id += parsedChar.toString(16)
    }
    return id;
  }

}
