const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.send("Hello World!");
});


    

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server started on port ${port}.`);
});