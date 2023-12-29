
import { GetRegisterUser, PostRegisterUser, GetUserLogin, PostUserLogin, GetUserProfile, UserLogOut, EditUserProfile, GetUser } from "../controllers/usersController.js";

import { GetArticles, PostArticles, GetSingleArticle, GetUsersArticle, EditArticle, DeleteArticle, PublishArticle } from "../controllers/articlesController.js";

import { ArguePost, GetArgue, GetArgueAssoc, GetSingleArg } from "../controllers/arguingArticleController.js";

import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";


const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

// console.log(storage.filename);

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });


// users routes
router.get('/');
router.get('/user/:id', GetUser);
router.put('/edit-user/:id', EditUserProfile);

// login routes
router.get('/login', GetUserLogin);
router.post('/login', PostUserLogin);

// Logout route
router.post('/logout', UserLogOut);

router.get('/profile', GetUserProfile);

// register routes
router.get('/register', GetRegisterUser);
router.post('/register', upload.single('image'), PostRegisterUser);

// Article routes

router.get('/single-article/:id', GetSingleArticle);
router.get('/users-articles/:id', GetUsersArticle);
router.get('/articles', GetArticles);
router.post('/post-articles', upload.single('image'), PostArticles);
router.put('/update-articles/:id', upload.single('image'), EditArticle);
router.put('/publish-article/:id', PublishArticle);
router.delete('/article-delete/:id', DeleteArticle);

// Argument routes

router.get('/arguments', GetArgue);
router.get('/arguments-assoc/:id', GetArgueAssoc);
router.get('/full-arg/:id', GetSingleArg);
router.post('/arguments', ArguePost);

export default router;