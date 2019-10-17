const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://john:SinfoniaAcentuar@cluster0-hfzas.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection Failed!')
  })
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});


module.exports = app;





const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port)