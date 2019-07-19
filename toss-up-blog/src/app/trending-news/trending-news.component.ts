import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import * as jQuery from 'jquery';
declare var $: any;

@Component({
  selector: 'app-trending-news',
  templateUrl: './trending-news.component.html',
  styleUrls: ['./trending-news.component.css']
})
export class TrendingNewsComponent implements OnInit {

  trendingNews: News[];

  sources: any[];

  constructor(private newsService: NewsService) {
    this.trendingNews = [];
    this.sources = [];
  }

  ngOnInit() {
    $('.ui.selection.dropdown').dropdown();
    $('.ui.fluid.search.dropdown').dropdown();
    this.newsService.getAllSources().subscribe((res: any) => {
      this.sources = res.sources;
    });
  }

  searchForTrendingNews(){
    let query = (<HTMLInputElement>document.getElementById('query')).value;
    let country = $('.ui.search.selection.dropdown.country').dropdown('get value');
    let category = $('.ui.selection.dropdown.category').dropdown('get value');
    let source = $('.ui.fluid.search.dropdown').dropdown('get value');
    
    this.newsService.searchForTrendingNews(query, country, category, source).subscribe((res: any) => {
      const articles = res.articles;
      this.trendingNews = articles.map((article) => {
        return {
          title: article.title,
          source: article.source.name,
          url: article.url,
          author: article.author != null ? article.author : '',
          publishedAt: new Date(article.publishedAt).toString(),
          id: this.urlToId(article.url)
        }
      })
      console.log(this.trendingNews);
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
