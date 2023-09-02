const express = require('express')    //here we import express module
const path = require('path');     //we use path module to direct to the path of views folder
// const fs = require("fs");   //fs module to read and write a file
const app = express();    //express is a app module that we are inserting here
const port = 8000;      //here we choose an 80 port to show the website  its localhost we do not have to define port in website
const hostname = '127.0.0.1'      //here we define the local host if we not define that also ok
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

//eXPRESS SPECIFIC STUFF

app.use('/static', express.static('static'))    //for serving static file
// app.use(express.urlencoded())  //this is a middle ware which help us to take a data from form and submit to express.
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Use the cors middleware

// Connect to MongoDB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/danceWeb");
  //   console.log("we are connected");
}

const InfoSchema = new mongoose.Schema({
  name: String,
  surname: String,
  // age: Number,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const Info = mongoose.model('Info', InfoSchema);

app.post('/add', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const info = new Info(req.body);
    await info.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')       //set the template engin in pug
app.set('views',path.join(__dirname, 'views'))          //set the view directory   ---- also we have to import path module to get the access folder/html


//END POINT
app.get('/', (req, res)=>{
 
  const param = {}
  res.status(200).render('home.pug',param)
})

app.get('/about', (req, res)=>{
  // console.log('About route accessed');
  const param = {}
  res.status(200).render('about.pug',param)
})

app.get('/contact', (req, res)=>{
  // console.log('Contact route accessed');
  const param = {}
  res.status(200).render('contact.pug',param)
})

app.get('/service', (req, res)=>{
  const param = {}
  res.status(200).render('service.pug',param)
})
app.get('/classInfo', (req, res)=>{
  const param = {}
  res.status(200).render('classInfo.pug',param)
})

// GETTING INFO FROM DATABASE

app.get('/search/name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const results = await Info.find({ name });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/search/email/:email', async (req, res) => {
  try {
    const email = parseInt(req.params.age);
    const results = await Info.find({ email });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

//START THE SERVER
app.listen(port,hostname, ()=>{
    console.log(`The application Listen on http://${hostname}:${port}/`)
})