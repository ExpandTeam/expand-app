const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    username: String,
});


const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}
