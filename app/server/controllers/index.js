const express = require('express');
const router = express.Router();
const dbRouter = require("./routers/db");
const apiRouter = require('./routers/api');

module.exports = function (app) {
  app.use('/db', dbRouter);
  app.use('/api', apiRouter);
  app.use('/', router);
};

router.get('/*', (req, res)=>{
  res.render('index', {title:"Test Title"});
});
