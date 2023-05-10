const express = require("express");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

dotenv.config("./.env");

// Configuration 
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
// const recipeDevelopRouter = require("./routers/recipeDevelopRouter");
const recipesRouter= require("./routers/recipesRouter")
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4001;

// middlewares
// app.use(express.json());
app.use(express.json({limit:"150mb"}))

app.use(morgan("common"));
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin: process.env.CORS_ORIGIN||"http://localhost:3000"
}));

//route
app.use("/auth", authRouter);
// app.use("/recipe", recipeDevelopRouter);
app.use("/recipes", recipesRouter);

// app.get('/',(req,res)=>{
//     res.status(200).send('Server is up and running')
// })

dbConnect();

app.listen(PORT, () => {
  console.log(`Listening to port:  ${PORT} `);
});
