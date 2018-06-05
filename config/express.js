const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../index.route');
const config = require('./config');
const APIError = require('../server/helper/APIError');

const app = express();

app.use(express.static(path.join(__dirname, './../public')));

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.set('view engine', 'ejs');
app.set('views', 'server/views');
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use('/', routes);

app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

module.exports = app;
