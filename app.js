const express = require('express');
const app = express();
const routes = require('./routes/routes');

const morgan = require('morgan');

app.use(express.json());
app.use('/items', routes);

module.exports = app;
