import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blogToEdit: Blog;

  loading: boolean = true;

  constructor(private blogService: BlogService, 
              private route: ActivatedRoute, 
              private router: Router) {}

  ngOnInit() {
    this.getBlogToEdit();
  }

  getBlogToEdit(){
    let blogID = this.route.snapshot.params.id;
    this.blogService.getBlogByID(blogID).subscribe((blog: Blog) => {
      this.blogToEdit = blog;
      this.blogToEdit.id = this.blogService.createObjectId(blog.id)
      this.loading = false;
      console.log(this.blogToEdit)
    })
  }

  updateBlog(){
    let blogTitle = (<HTMLInputElement>document.getElementById("blogTitle")).value;
    let blogBody = (<HTMLTextAreaElement>document.getElementById("blogBody")).value;
    
    let editedBlog = {
      ...this.blogToEdit,
      title: blogTitle,
      body: blogBody,
      updateDate: new Date()
    };

    console.log(editedBlog)
    
    this.blogService.updateBlog(editedBlog).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }

}
