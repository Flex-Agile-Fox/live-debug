const express = require('express');

const app = express;

const routes = require('./routes/');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler());
app.use('/', routes);



module.exports = app;
