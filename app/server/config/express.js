const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');

module.exports = function(app, config) {
    let env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';
  
    app.set('views', config.root + '/server/views');
    app.set('view engine', 'nunjucks');
    nunjucks.configure(config.root + '/server/views', {
        autoescape: true,
        express: app
    });
  
    // app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json({limit:"1000kb"}));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/static'));
    app.use(methodOverride());
  
    app.set('trust proxy', 1);
  
    let controllers = glob.sync(config.root + '/server/controllers/*.js');
    controllers.forEach(function (controller) {
      require(controller)(app);
    });
  
    app.use(function (req, res, next) {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
  
    if(app.get('env') === 'development'){
  
      app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err,
          title: 'error'
        });
      });
    }
  
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {},
          title: 'error'
        });
    });
  
    return app;
};
  