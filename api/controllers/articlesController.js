import expressAsyncHandler from "express-async-handler";
import { ArticleModel } from "../models/articles.js"; 
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/users.js";
const asyncHandler = expressAsyncHandler;

const jwtSecret = 'jwhfuuryfgsanifdl';

const GetUsersArticle = asyncHandler(async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({author: req.params.id}).exec();
    if (!articles) {
      return res.status(404).json({ message: "You Do not have any articles" });
    }
    return res.json(articles);
  } catch ( e ) {
    return res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
})

const GetSingleArticle = asyncHandler(async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id).populate('author');
    if (!article) {
      return res.status(404).json({ message: "The article does not exist" });
    } 
    return res.json(article);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
})

const GetArticles = asyncHandler( async (req, res, next) => {
  const articles = await ArticleModel.find({published: true}).populate('author').sort({createdAt: -1});
  return res.status(200).json(articles);
});

const PostArticles = asyncHandler(async (req, res, next) => {

  // file upload functionality comes here... 

  const {title, body} = req.body;
  const {token} = req.cookies;
  const photo = req.file.filename;
  try {
    if (token) {
      jsonwebtoken.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const {_id} = await UserModel.findById(user.id);  
        const article = await ArticleModel.create({
          author: _id,
          photo,
          title,
          body,
        });
       return res.json(article);
      });
    }
  } catch (e) {
    return res.status(422).json(e);
  }
});

const EditArticle = asyncHandler(async (req, res, next) => {
  try {
    const {title, body} = req.body;
    console.log(title);
    if (!title || !body) {
      return res.status(400).send({message: "Send all required fields"});
    }
    const result = await ArticleModel.findByIdAndUpdate(req.params.id, {title, body});
    if (!result) {
      return res.json("Something went terribly wrong");
    }
  } catch (e) {
    console.log(error.message);
    return res.status(500).send({message: error.message});
  }
});

const PublishArticle = asyncHandler(async (req, res, next) => {
  try {
    const {published} = req.body;
    console.log(published)
    const result = await ArticleModel.findByIdAndUpdate(req.params.id, {published});
    return res.json(result);
  } catch (e) {
    return res.status(500).send({message: e}); 
  }
});

const DeleteArticle = asyncHandler(async (req, res, next) => {
  await ArticleModel.findByIdAndDelete(req.params.id);
  try {
   return res.status(204).json({status: 'Success', data: {}});
  } catch (e) {
    return res.status(500).json({status: 'Failed', message: {e}});
  }
});

export {GetArticles, PostArticles, GetSingleArticle, GetUsersArticle, EditArticle, DeleteArticle, PublishArticle}

