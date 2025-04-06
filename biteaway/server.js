const exp = require("constants");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require('./db')

//routes,
var indexRouter = require('./routes/index');
var restaurantRouter = require('./routes/restaurant');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var orderRouter = require('./routes/order');
const User = require("./models/User");
const Order = require("./models/Order");
const Restaurant = require("./models/Restaurant");
const Review = require("./models/Review");
const Item = require("./models/Item");
const Cuisine = require("./models/Cuisine");

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

//ROUTES,
app.use('/', indexRouter); //khushis login & homepage
app.use('/restaurant', restaurantRouter); //trisha's restaurant homepage
app.use('/order', orderRouter); //joshna's ordering page
app.use('/user', userRouter); //hannah's user profile
app.use('/admin', adminRouter); //joshna's admin pages (order management)

//this will probably have to be changed later
async function setup() {
  //adding sample data?
  const John= await User.create({
    userID: 101,
    firstName: "John",
    lastName: "Doe",
    countryCode: 1,
    phoneNumber: 1234567890,
    userAddress: "123 Baker's Street, Pullman, WA",
    email: "johndoe@example.com",
    password: "securepassword"
  });

  const rev= await Review.create({
    reviewID: 1,
    userID: 101,
    reviewRating: 5,
    reviewDescription: "Good food, quick service and helpful staff.",
  });

  const res= await Restaurant.create({
    restaurantID: 1,
    restaurantName: "Thai Ginger",
    restaurantAddress: "256 Forest Avenue, Pullman, WA",
    //cuisines: "Asian",
    // reviews
    restaurantRating: 4.5,
  });

  const ord= await Order.create({
    orderID: 1,
    userID: 101,
    restaurantID: 1,
    orderDate: new Date(),
    orderPrice: 27.98,
    userAddress: "123 Baker's Street, Pullman, WA",
    status: "Pending",
  });

  const item1= await Item.create({
    itemID: 3,
    restaurantID: 1,
    itemName: "Pad Thai",
    itemPrice: 12.99,
    itemDescription: "Stir fried rice noddles with egg, vegetables and peanuts ",
  });

  const item2= await Item.create({
    itemID: 4,
    restaurantID: 1,
    itemName: "Thai Green Curry",
    itemPrice: 14.99,
    itemDescription: "Spicy curry with coconut currey, vegetables and your choice of protein",
  });

  const cuisine1 = await Cuisine.create({
    cuisineType: "Thai",
    restaurantID: 1,
  });

  const cuisine2 = await Cuisine.create({
    cuisineType: "Asian",
    restaurantID: 1,
  });
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