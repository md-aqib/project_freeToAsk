const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const myURL = require('./config/myURL') 



const app = express()

//Middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoDB configuration
const db = require("./config/myURL").mongoURL; 


//Attempt to connect to database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running at ${port}`));