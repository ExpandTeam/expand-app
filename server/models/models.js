const express = require('express');
const mongoose = require('mongoose');

const client = algoliasearch(
  'NMF6ZVXSCJ',
  process.env.ALGOLIA_ID
);

const index = client.initIndex('demo_ecommerce');

index.setSettings({
  // Select the attributes you want to search in
  searchableAttributes: [
    'brand', 'name', 'categories', 'description'
  ],
  // Define business metrics for ranking and sorting
  customRanking: [
    'desc(popularity)'
  ],
  // Set up some attributes to filter results on
  attributesForFaceting: [
    'categories', 'searchable(brand)', 'price'
  ]
});

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema({
    _id: String,
    username: String,
});

const articleSchema = new Schema({
    _id: String,
    body: String,
    title: String,
    owner: {
        type: ObjectId,
        ref: 'User',
    }
})

articleSchema.index()





const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);



module.exports = {
    User: User,
    Article: Article,
}
