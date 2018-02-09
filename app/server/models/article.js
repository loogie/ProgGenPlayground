// Example model
const thinky = require('../config/thinky');
const uuidv1 = require('uuid/v1');
const r = thinky.r;
const type = thinky.type;

let Article = thinky.createModel('Article', {
  id: type.string().default(uuidv1()),
  title: type.string(),
  authorId: type.string(),
  createdAt: type.date().default(r.now()),
  text: type.string()
});

Article.ensureIndex("id");

module.exports = Article;

// example on how to add relations
// var Comment = require('./comment');
// Article.hasMany(Comment, 'comments', 'id', 'article_id');