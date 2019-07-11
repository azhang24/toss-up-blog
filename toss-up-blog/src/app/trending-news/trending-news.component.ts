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
    this.newsService.getAllSources().subscribe((res: any) => {
      this.sources = res.sources;
      console.log(this.sources);
    });
  }

  searchForTrendingNews(){
    let query = (<HTMLInputElement>document.getElementById('query')).value;
    let country = $('.ui.search.selection.dropdown.country').dropdown('get value');
    let category = $('.ui.selection.dropdown.category').dropdown('get value');
    let source = $('.ui.search.selection.dropdown.source').dropdown('get value');
    
    this.newsService.searchForTrendingNews(query, country, category, source).subscribe((res) => {
      console.log(res);
    })

  }

}
