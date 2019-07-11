import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private apiKey = encodeURIComponent('1b1b14f0e9da43378e5e0672bf0621f9');

  getTrendingNewsByCountry(country: string){

    const url = `https://newsapi.org/v2/top-headlines?apiKey=${this.apiKey}&country=${country}`;

    return this.http.get(url);
  }

  getAllSources(){
    const url = `https://newsapi.org/v2/sources?apiKey=${this.apiKey}`;

    return this.http.get(url);
  }

  searchForTrendingNews(query:string, country:string, category:string, source:string){
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&source=${source}&q=${query}&apiKey=${this.apiKey}`;

    return this.http.get(url);
  }
}
