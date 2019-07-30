package com.tossupblog.api;

import org.springframework.data.annotation.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="blogs")
public class Blog{
    
    @Id
    private ObjectId id;
    private String title;
    private String body;
    private String publicationDate;
    private String newsID;

    public Blog(){

    }

    public Blog(ObjectId id, String title, String body, String publicationDate, String newsID){
        this.setID(id);
        this.setTitle(title);
        this.setBody(body);
        this.setPublicationDate(publicationDate);
        this.setNewsID(newsID);
    }

    public ObjectId getID(){
        return this.id;
    }

    public void setID(ObjectId id){
        this.id = id;
    }

    public String getTitle(){
        return this.title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getBody(){
        return this.body;
    }

    public void setBody(String body){
        this.body = body;
    }

    public String getPublicationDate(){
        return this.publicationDate;
    }

    public void setPublicationDate(String publicationDate){
        this.publicationDate = publicationDate;
    }

    public String getNewsID(){
        return this.newsID;
    }

    public void setNewsID(String newsID){
        this.newsID = newsID;
    }
    
    
}