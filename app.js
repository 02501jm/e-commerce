const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Item = require('./models/item');

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
  // it = JSON.parse(req.body);
  // const item = new Item({
  //   name: it.name,
  //   description: it.description
  // });
  // item.save();
  res.status(201).json({
    message: 'Item added succesfully'
  });
});

app.get("/api/items", (req, res) => {
  console.log('Entered getItems')
});


module.exports = app;