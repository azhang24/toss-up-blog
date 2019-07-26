import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(){
    return this.http.get(this.apiUrl)
  }

  addBlog(blog: Blog){
    return this.http.post(this.apiUrl, blog)
  }

}
