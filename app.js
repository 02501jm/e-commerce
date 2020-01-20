const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require('./models/item');
var AWS = require('aws-sdk');

const app = express();

mongoose.connect("mongodb+srv://john:SinfoniaAcentuar@cluster0-hfzas.mongodb.net/commerce?retryWrites=true&w=majority", { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

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
      res.status(200).json({
        message:'Posts fetched succesfully',
        posts:documents
      })
    })
});


module.exports = app;