const exp = require("constants");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require('./db')

// const fs = require("fs")
const app = express();
//app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "biteaway",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

//for body parser
app.use(bodyParser.urlencoded());

//static folder for css and images
app.use("/static/", express.static("static"))

//use ejs templating
app.set("view engine", "ejs")

//folder for finding ejs files
app.set("views", path.join(__dirname, "/views"))

app.get("/", async function (req, res) {
  res.render("restaurantHome")
})

//this will probably have to be changed later
async function setup() {
  //adding sample data?
}

//sync and setup database
//!!!!!! IMPORTANT MAKE SURE TO REMOVE  { force: true } BEFORE SUBMISSION
//refreshes every time (does not store data) <- for this reason
sequelize.sync({ force: true }).then(() => {
  console.log("sequelize sync Completed...")
  setup().then(() => console.log("database setup complete! "))
})

app.listen(3000, function () {
  console.log("server listening...");
  console.log("server started in port 3000");
  });