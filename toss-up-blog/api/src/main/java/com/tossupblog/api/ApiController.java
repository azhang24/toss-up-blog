package com.tossupblog.api;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin("*")
public class ApiController{

    @Autowired
    ApiRepository apiRepository;

    @GetMapping("/api/blogs")
    public List<Blog> getBlogs(HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        return apiRepository.findAll();
    }

    @GetMapping("/api/blogs/{id}")
    public Blog getBlogById(@PathVariable String id, HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        ObjectId objid = new ObjectId(id);
        return apiRepository.findById(objid);
    }

    @GetMapping("/api/blogs/news/{newsID}")
    public Blog[] getBlogByNewsId(@PathVariable String newsID, HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        return apiRepository.findBynewsID(newsID);
    }

    @PostMapping("/api/blogs")
    public Blog createBlog(@RequestBody Map<String, String> body, HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        ObjectId id;
        if(body.get("id") == null){
            id = new ObjectId();
        }
        else{
            id = new ObjectId(body.get("id"));
        }

        String title = body.get("title");
        String bdy = body.get("body");
        Date publicationDate = new Date();
        String newsID = body.get("newsID");

        return apiRepository.save(new Blog(id, title, bdy, publicationDate, newsID));
    }

    @PutMapping("/api/blogs/{id}")
    public Blog updateBlog(@PathVariable String id, @RequestBody Map<String, String> body, HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        String title = body.get("title");
        String bdy = body.get("body");
        String newsID = body.get("newsID");

        Blog blogToUpdate = this.getBlogById(id, res);

        blogToUpdate.setTitle(title);
        blogToUpdate.setBody(bdy);
        blogToUpdate.setNewsID(newsID);

        return apiRepository.save(blogToUpdate);
    }

    @DeleteMapping("/api/blogs/{id}")
    public boolean deleteBlog(@PathVariable String id, HttpServletResponse res){
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        apiRepository.deleteById(new ObjectId(id));
        return true;
    }
}