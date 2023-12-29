import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const asyncHandler = expressAsyncHandler;

import UserModel from "../models/users.js";

// generate bcrypt salt
const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'jwhfuuryfgsanifdl';

const GetUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({message: "This user does not exist"});
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});

const GetUserLogin = asyncHandler(async (req, res, next) => {
  res.send("This is you trying to Login.")
});

const GetUserProfile = asyncHandler(async (req, res, next) => {
  const {token} = req.cookies;
  if (token) {
    jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {username, full_name,email, _id, image} = await UserModel.findById(userData.id);
      res.json({username, full_name, email, _id, image});
    });
  } else {
    res.json(null);
  }
});

const PostUserLogin = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;
  const userInfo = await UserModel.findOne({email:email});
  if (userInfo.email) {
    // check if password is true
    const passTrue = bcrypt.compareSync(password, userInfo.password);
    if (passTrue) {
      jsonwebtoken.sign({email:userInfo.email, id:userInfo._id}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userInfo);
      });
    } else {
      res.status(422).json('Password False');
    }
  } else {
    res.json('Not Found');
  }
});

const GetRegisterUser = asyncHandler(async (req, res, next) => {
  res.send("The GetRegisterUser Conteller");
});

const PostRegisterUser = asyncHandler(async (req, res, next) => {
  const {username, full_name, email, password} = req.body;
  const image = req.file.filename;
  try {
    const userInfo = await UserModel.create({
      image,
      username,
      full_name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userInfo);
  } catch (e) {
    res.status(422).json(e);
  }
});

const EditUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { username, full_name, email } = req.body;
    // const photo = req.file.filename;
    if (!username || !full_name || !email) {
      return res.status(400).send({message: "Send all required fields"});
    }
    const result = await UserModel.findByIdAndUpdate(req.params.id, { username, full_name, email});
    if (!result) {
      return res.json("Something went wrong");
    }
    res.json(result);
  } catch (e) {
    res.status(500).send({message: error.message});
  }
});

const UserLogOut = asyncHandler(async (req, res) => {
  res.cookie('token', '').json(true);
});

export {GetUser, GetRegisterUser, PostRegisterUser, GetUserLogin, PostUserLogin, GetUserProfile, UserLogOut, EditUserProfile};


