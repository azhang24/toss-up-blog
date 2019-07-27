package com.tossupblog.api;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiRepository extends MongoRepository<Blog, String>{
    public Blog findById(ObjectId id);
    public Blog[] findBynewsID(String newsID);
    public void deleteById(ObjectId id);
}