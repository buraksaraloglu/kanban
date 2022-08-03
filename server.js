require('dotenv').config();

const fallback = require('express-history-api-fallback');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SPA
const root = path.resolve(__dirname, './dist');
const assets = path.resolve(__dirname, './dist/static');

app.use('/static', express.static(assets));
app.use(fallback('index.html', { root }));

http.listen(port, function () {
  console.log('Listening http://localhost:' + port);
});
