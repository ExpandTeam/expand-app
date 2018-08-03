const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    username: String,
});

const articleSchema = new Schema({
    _id: String,
    body: String,
    title: String,
    owner: String,
})

const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);

module.exports = {
    User: User,
    Article: Article,
}
