const config = require('../config/config');
const glob = require('glob');
const thinky = require('../config/thinky');

let models = {
  r: thinky.r
};

let files = glob.sync(config.root + '/server/models/!(index)*.js');
files.forEach(function (file) {
  let model = require(file);
  models[model.getTableName()] = model;
});

module.exports = models;