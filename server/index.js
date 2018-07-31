require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const ddb = new AWS.DynamoDB();
const express = require('express');
const app = express();

app.get('/api/users/:address', function (req, res) {
    const params = {
        TableName: 'Users',
        Key: {
            Address: {
                S: req.params.address,
            },
        },
        ProjectionExpression: 'Username',
    };
    ddb.getItem(params, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data.Item.Username.S);
        }
    });
});

app.get('/api/articles', function (req, res) {
    // const sortBy = req.query.sortBy;
    const ascending = req.query.sortOrder == "ascending" ? true : false;
    const params = {
        TableName: 'Articles',
        // IndexName: sortBy,
        Limit: 5,
    };
    ddb.scan(params, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});

app.listen(3000);
