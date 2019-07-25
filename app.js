var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./db');

const {port, databaseName} = require('./config');
const cors = require('cors');
console.log(`Your port    : ${port}`);
console.log(`Database name: ${databaseName}`);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(function (req, res, next) {
    var origin = req.headers.origin;

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,authorization, Authorization');

    if (/Trident/.test(origin)) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    }

    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }

    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

const routerIndex = require('./routes/index')();

app.use(routerIndex);

module.exports = app;
