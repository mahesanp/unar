const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const lo = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/about", function(req, res){
  res.render("about-us");
});

app.get("/contact", function(req, res){
  res.render("contact-us");
});

app.get("/case_studies", function(req, res){
  res.render("blog-post-list");
});

app.get("/services", function(req, res){
  res.render("service-page");
});

app.listen(3000, '0.0.0.0', function(){
  console.log("server listening on port 3000");
})
