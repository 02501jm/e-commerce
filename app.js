const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require('./models/item');
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

var uploadParams = {Bucket: 'images-bucket4526', Key: '', Body: ''};
var file = 'helloworld.txt';
var fs = require('fs');

var uuid = require('uuid');

const fileUpload = require('express-fileupload');



const app = express();

mongoose.connect("mongodb+srv://john:SinfoniaAcentuar@cluster0-hfzas.mongodb.net/commerce?retryWrites=true&w=majority", { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});

app.post("/api/items", (req, res) => {
   console.log(req.body);
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    sold: req.body.sold,
    followers: req.body.followers,
    rating: req.body.rating,
    comments: req.body.comments,
    time: req.body.time
  });
  console.log("item", item);
  item.save();
  res.status(201).json({
    message: 'Item added succesfully'
  });
});
 
app.post("/api/items/update", (req, res) => {
  Item.findByIdAndUpdate(req.body.id, {price: req.body.price})
    .then( document => {
      res.send(document);
    });
});

app.get("/api/items", (req, res) => {
  Item.find()
    .then(documents => {
      console.log("posts fetched");
      res.status(200).json({
        message:'Posts fetched succesfully',
        posts:documents
      })
    })
});

app.get("/api/image/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  let id = uuid();
  let filename = id + '.jpg';
  sampleFile.mv(__dirname + '/images/' + filename, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
    });

  var fileStream = fs.createReadStream(__dirname + '/images/' + filename);
  fileStream.on('error', function(err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  var path = require('path');
  uploadParams.Key = path.basename(file);
  
  s3.upload (uploadParams, function (err, data){
    if (err) {
      console.log("Error", err);
      res.send(err);
    } if (data) {
      console.log("Upload Success", data.Location);
      res.send(data.Location);
      
    }
  })
});

module.exports = app;