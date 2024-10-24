import express from "express";
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors" ;
import mongoDbConnect from "./config/mongoDb.js";
import { errorHandler } from "./utilis/errorHandler.js";

import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"

// env config
dotenv.config();

// init express
const app = express();

// static folder 
app.use(express.static("public"));

// set middleware 
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));


// routes 
app.use("/api/user", userRouter); 
app.use("/api/auth", authRouter); 


// error handler 
app.use(errorHandler); 

app.listen(5050, () => {
  mongoDbConnect(),
  console.log(` Server is running on port 5050`.bgGreen.black);
})




