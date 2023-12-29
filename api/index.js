import express from "express";
import router from "./routes/routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
const logger = morgan('dev');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/opinionated');

app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Connecting to the clientside using cors
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use("/", router);
// app.use("/users", router);
app.use('/images', express.static('images'));

app.listen(8800, () => {
  console.log("connected to backend!");
})
