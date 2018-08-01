require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const main = require('./routes/main');
const models = require('./models/models');

const app = express();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    dbName: "expand-cache",
    auth: {
        user: "expand-cache",
        password: process.env.MONGODB_PASSWORD
    }
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({exteneded: false}));

app.use('/', main);

app.listen(process.env.PORT || 3000);
