import mongoose, { Schema } from "mongoose";

const ArticleSchema = mongoose.Schema({
  author: {type: Schema.Types.ObjectId, ref: "users", required: true},
  photo: {type:String, require: false},
  title: {type: String},
  body: {type: String},
  published: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

const ArguingArticleSchema = mongoose.Schema({
  author: {type: Schema.Types.ObjectId, ref: "users", required: true},
  article: {type: Schema.Types.ObjectId, ref: "articles", required: true},
  title: {type: String, require: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

const ArticleModel = mongoose.model('articles', ArticleSchema);
const ArguingArticle = mongoose.model('artargs', ArguingArticleSchema);

export { ArticleModel, ArguingArticle };