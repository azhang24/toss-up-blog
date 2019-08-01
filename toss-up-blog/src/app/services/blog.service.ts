import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) { }

  createObjectId(id: any){
    let timestamp = id.timestamp.toString(16);
    let machineid = id.machineIdentifier.toString(16);
    let processid = id.processIdentifier.toString(16);
    if(processid.length < 4){
      let leadingzeros = '0'.repeat(4 - processid.length)
      processid = leadingzeros + processid
    }
    let counter = id.counter.toString(16);
    let objId = timestamp + machineid + processid + counter + "";
    return objId;
  }

  getBlogs(){
    return this.http.get(this.apiUrl)
  }

  getBlogByNewsID(newsID: string){
    return this.http.get(`${this.apiUrl}/news/${newsID}`)
  }

  addBlog(blog: Blog){
    return this.http.post(this.apiUrl, blog)
  }

  deleteBlog(blog: Blog){
    console.log(blog.id)
    return this.http.delete(`${this.apiUrl}/${blog.id}`)
  }

}
