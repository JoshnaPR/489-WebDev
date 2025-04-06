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
  const JohnDoe= await User.create({
    userID: 101,
    firstName: "John",
    lastName: "Doe",
    countryCode: 1,
    phoneNumber: 1234567890,
    userAddress: "123 Baker's Street, Pullman, WA",
    email: "johndoe@example.com",
    password: "securepassword"
  });

  const JaneDoe= await User.create({
    userID: 102,
    firstName: "Jane",
    lastName: "Doe",
    countryCode: 1,
    phoneNumber: 2345678901,
    userAddress: "123 Baker's Street, Pullman, WA",
    email: "janedoe@example.com",
    password: "securepassword1"
  });

  const EmmaStone= await User.create({
    userID: 103,
    firstName: "Emma",
    lastName: "Stone",
    countryCode: 1,
    phoneNumber: 3456789012,
    userAddress: "456 Pine Lane, Pullman, WA",
    email: "emma.stone@example.com",
    password: "securepassword12"
  });

  const ShaneWilson= await User.create({
    userID: 104,
    firstName: "Shane",
    lastName: "Wilson",
    countryCode: 1,
    phoneNumber: 4567890123,
    userAddress: "789 Oak Drive, Pullman, WA",
    email: "shanewilson@example.com",
    password: "securepassword123"
  });

  // John Doe's review
  const review1= await Review.create({
    reviewID: 1,
    userID: 101,
    reviewRating: 5,
    reviewDescription: "Good food, quick service and helpful staff.",
  });

  const ThaiGinger= await Restaurant.create({
    restaurantID: 1,
    restaurantName: "Thai Ginger",
    restaurantAddress: "256 Forest Avenue, Pullman, WA",
    //cuisines: "Asian",
    // reviews
    restaurantRating: 4.5,
  });

  const ItalianoBello = await Restaurant.create({
    restaurantID: 2,
    restaurantName: "Italiano Bello",
    restaurantAddress: "128 University Way, Pullman, WA",
    restaurantRating: 4.7,
  });
  
  const BurgerShack = await Restaurant.create({
    restaurantID: 3,
    restaurantName: "Burger Shack",
    restaurantAddress: "532 College Hill, Pullman, WA",
    restaurantRating: 4.2,
  });
  
  const SushiKing = await Restaurant.create({
    restaurantID: 4,
    restaurantName: "Sushi King",
    restaurantAddress: "890 Downtown Plaza, Pullman, WA",
    restaurantRating: 4.8,
  });

  const IndianSpice = await Restaurant.create({
    restaurantID: 6,
    restaurantName: "Indian Spice",
    restaurantAddress: "423 Grand Avenue, Pullman, WA",
    restaurantRating: 4.8,
  });

  const ThaiCuisine = await Cuisine.create({
    cuisineType: "Thai",
    restaurantID: 1,
  });

  const AsianCuisine = await Cuisine.create({
    cuisineType: "Asian",
    restaurantID: 1,
  });

  const ItalianCuisine = await Cuisine.create({
    cuisineType: "Italian",
    restaurantID: 2,
  });
  
  const AmericanCuisine = await Cuisine.create({
    cuisineType: "American",
    restaurantID: 3,
  });

  const JapaneseCuisine = await Cuisine.create({
    cuisineType: "Japanese",
    restaurantID: 4,
  });

  const MexicanCuisine = await Cuisine.create({
    cuisineType: "Mexican",
    restaurantID: 5,
  });

  const IndianCuisine = await Cuisine.create({
    cuisineType: "Indian",
    restaurantID: 6,
  });

  // John Doe's order
  const order1= await Order.create({
    orderID: 1,
    userID: 101,
    restaurantID: 1,
    orderDate: new Date(),
    orderPrice: 27.98,
    userAddress: "123 Baker's Street, Pullman, WA",
    status: "Pending",
  });

 // Italiano Bello Items
  const margheritaPizza = await Item.create({
    itemID: 3,
    restaurantID: 2,
    itemName: "Margherita Pizza",
    itemPrice: 15.99,
    itemDescription: "Classic pizza with tomato sauce, mozzarella, and fresh basil"
  });
  
  const fettuccineAlfredo = await Item.create({
    itemID: 4,
    restaurantID: 2,
    itemName: "Fettuccine Alfredo",
    itemPrice: 16.99,
    itemDescription: "Creamy pasta with parmesan cheese and butter sauce"
  });
  
  // Burger Shack Items
  const classicBurger = await Item.create({
    itemID: 5,
    restaurantID: 3,
    itemName: "Classic Burger",
    itemPrice: 10.99,
    itemDescription: "Beef patty with lettuce, tomato, onion, and house sauce"
  });
  
  const loadedFries = await Item.create({
    itemID: 6,
    restaurantID: 3,
    itemName: "Loaded Fries",
    itemPrice: 6.99,
    itemDescription: "French fries topped with cheese, bacon, and sour cream"
  });
  
  // Sushi King Items
  const californiaRoll = await Item.create({
    itemID: 7,
    restaurantID: 4,
    itemName: "California Roll",
    itemPrice: 9.99,
    itemDescription: "Crab, avocado, and cucumber rolled in seaweed and rice"
  });
  
  const salmonSashimi = await Item.create({
    itemID: 8,
    restaurantID: 4,
    itemName: "Salmon Sashimi",
    itemPrice: 12.99,
    itemDescription: "Fresh slices of raw salmon served with wasabi and ginger"
  });
  
  // Taco Cantina Items
  const beefTacos = await Item.create({
    itemID: 9,
    restaurantID: 5,
    itemName: "Beef Tacos",
    itemPrice: 8.99,
    itemDescription: "Three corn tortillas filled with seasoned beef, onions, and cilantro"
  });
  
  const guacamole = await Item.create({
    itemID: 10,
    restaurantID: 5,
    itemName: "Guacamole & Chips",
    itemPrice: 5.99,
    itemDescription: "Fresh guacamole served with crispy tortilla chips"
  });
  
  // India Spice Items
  const butterChicken = await Item.create({
    itemID: 11,
    restaurantID: 6,
    itemName: "Butter Chicken",
    itemPrice: 16.99,
    itemDescription: "Tender chicken in a creamy tomato sauce with Indian spices"
  });
  
  const vegetableBiryani = await Item.create({
    itemID: 12,
    restaurantID: 6,
    itemName: "Vegetable Biryani",
    itemPrice: 13.99,
    itemDescription: "Fragrant rice dish with mixed vegetables and aromatic spices"
  });

  const PadThai= await Item.create({
    itemID: 3,
    restaurantID: 1,
    itemName: "Pad Thai",
    itemPrice: 12.99,
    itemDescription: "Stir fried rice noddles with egg, vegetables and peanuts ",
  });

  const ThaiGreenCurry= await Item.create({
    itemID: 4,
    restaurantID: 1,
    itemName: "Thai Green Curry",
    itemPrice: 14.99,
    itemDescription: "Spicy curry with coconut currey, vegetables and your choice of protein",
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