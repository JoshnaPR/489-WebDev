const exp = require("constants");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

// const fs = require("fs")
const app = express();
//app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "cpts489",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(bodyParser.urlencoded());

app.listen(3000, function () {
  console.log("server listening...");
  console.log("server started in port 3000");
  });