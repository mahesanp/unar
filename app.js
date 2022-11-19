//server code
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

app.post("/contact", function(req, res){
    const output = `<h2>You have a new contact request</h2>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.Name}</li>
      <li>Email: ${req.body.Email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    var api_key = getApi();
    var domain = 'sandboxf2473e62392e47bdae2c6fd2fd5e8840.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
      from: 'mahesanp789@gmail.com',
      to: 'admin@unarai.com',
      subject: 'New Contact Details',
      html: output,
    };

    mailgun.messages().send(data, function (error, body) {
        if (error){
            console.log(error);
        }
      console.log(body);
      res.render("contact-us");
    });
});

function getApi(){
  let api = fs.readFileSync("../api.txt");
  return api.toString().slice(0, -1);
}

app.listen(3000, function(){
  console.log("server listening on port 3000");
})
