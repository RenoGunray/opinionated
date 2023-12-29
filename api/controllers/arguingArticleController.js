import expressAsyncHandler from "express-async-handler";
import { ArguingArticle } from "../models/articles.js"; 
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/users.js";
const asyncHandler = expressAsyncHandler;

const jwtSecret = 'jwhfuuryfgsanifdl';

const GetArgue = asyncHandler(async(req, res, next) => {
  res.send("Getting All Arguements");
});

const GetSingleArg = asyncHandler(async (req, res, next) => {
  try {
    const arg = await ArguingArticle.findById(req.params.id).populate('author');
    if (!arg) {
      return res.status(404).json({ message: "Argument not found" });
    }
    return res.json(arg);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

const GetArgueAssoc = asyncHandler(async (req, res, next) => {
  try {
    const argue = await ArguingArticle.find({article: req.params.id}).populate('author')
    if (!argue) {
      return res.status(404).json({ message: "Argument not found" });
    }
    return res.json(argue);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

const ArguePost = asyncHandler (async (req, res, next) => {
  const {art_id, title, body} = req.body;
  const {token} = req.cookies;
  try {
    if (token) {
      jsonwebtoken.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const {_id} = await UserModel.findById(user.id);  
        const article = await ArguingArticle.create({
          author: _id,
          article: art_id,
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

export {GetArgue, ArguePost, GetArgueAssoc, GetSingleArg}