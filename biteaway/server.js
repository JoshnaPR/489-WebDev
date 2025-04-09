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

//models,
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

async function setup() {
  // associations for models
  Cuisine.associate({ Restaurant })
  Item.associate({ Restaurant, Order })
  Order.associate({ User, Item })
  Restaurant.associate( { Cuisine, Review, Item })
  Review.associate({ User, Restaurant });

  //adding sample data
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

  const MichaelJohnson = await User.create({
    userID: 105,
    firstName: "Michael",
    lastName: "Johnson",
    countryCode: 1,
    phoneNumber: 5678901234,
    userAddress: "223 College Avenue, Pullman, WA",
    email: "michael.johnson@example.com",
    password: "securepassword456"
  });

  const SarahLee = await User.create({
    userID: 106,
    firstName: "Sarah",
    lastName: "Lee",
    countryCode: 1,
    phoneNumber: 6789012345,
    userAddress: "445 Maple Street, Pullman, WA",
    email: "sarah.lee@example.com",
    password: "securepassword789"
  });

  const DavidChen = await User.create({
    userID: 107,
    firstName: "David",
    lastName: "Chen",
    countryCode: 1,
    phoneNumber: 7890123456,
    userAddress: "890 Elm Road, Pullman, WA",
    email: "david.chen@example.com",
    password: "securepassword321"
  });

  const PriyaSharma = await User.create({
    userID: 108,
    firstName: "Priya",
    lastName: "Sharma",
    countryCode: 1,
    phoneNumber: 8901234567,
    userAddress: "567 University Lane, Pullman, WA",
    email: "priya.sharma@example.com",
    password: "securepassword654"
  });

  const CarlosRodriguez = await User.create({
    userID: 109,
    firstName: "Carlos",
    lastName: "Rodriguez",
    countryCode: 1,
    phoneNumber: 9012345678,
    userAddress: "678 Stadium Way, Pullman, WA",
    email: "carlos.rodriguez@example.com",
    password: "securepassword987"
  });

  // John Doe's review 1
  const review1 = await Review.create({
    reviewID: 1,
    restaurantID: 1,
    userID: 101,
    reviewRating: 5.0,
    reviewDescription: "Good food, quick service and helpful staff.",
  });

  // John Doe's review 2
  const review2 = await Review.create({
    reviewID: 2,
    restaurantID: 2,
    userID: 101,
    reviewRating: 0.5,
    reviewDescription: "Not that good tbh.",
  });

  // John Doe's review 3
  const review3 = await Review.create({
    reviewID: 3,
    restaurantID: 3,
    userID: 101,
    reviewRating: 0.0,
    reviewDescription: "My friend Akalya hated it! Her food was raw! And, she's vegan, but they put real meat in her burger! 0 stars!",
  });

  const review4 = await Review.create({
    reviewID: 4,
    restaurantID: 4,
    userID: 102,
    reviewRating: 4.5,
    reviewDescription: "The sushi was incredibly fresh and the service was excellent!",
  });

  const review5 = await Review.create({
    reviewID: 5,
    restaurantID: 5,
    userID: 103,
    reviewRating: 3.5,
    reviewDescription: "Good value for money, but the food was a bit greasy.",
  });

  const review6 = await Review.create({
    reviewID: 6,
    restaurantID: 6,
    userID: 104,
    reviewRating: 5.0,
    reviewDescription: "The most authentic Indian food I've had in Pullman. Amazing flavors!",
  });

  const review7 = await Review.create({
    reviewID: 7,
    restaurantID: 1,
    userID: 105,
    reviewRating: 4.0,
    reviewDescription: "Pad Thai was delicious but service was a bit slow during rush hour.",
  });

  const review8 = await Review.create({
    reviewID: 8,
    restaurantID: 2,
    userID: 106,
    reviewRating: 4.8,
    reviewDescription: "The pasta was cooked to perfection! Will definitely be back.",
  });

  const review9 = await Review.create({
    reviewID: 9,
    restaurantID: 3,
    userID: 107,
    reviewRating: 3.0,
    reviewDescription: "Decent burgers but they forgot my order of fries.",
  });

  const ThaiGinger= await Restaurant.create({
    restaurantID: 1,
    restaurantName: "Thai Ginger",
    restaurantAddress: "256 Forest Avenue, Pullman, WA",
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

  const TacoBell = await Restaurant.create({
    restaurantID: 5,
    restaurantName: "Taco Bell",
    restaurantAddress: "1234 Coug Drive, Pullman, WA",
    restaurantRating: 4.0,
  });

  const IndianSpice = await Restaurant.create({
    restaurantID: 6,
    restaurantName: "Indian Spice",
    restaurantAddress: "423 Grand Avenue, Pullman, WA",
    restaurantRating: 4.8,
  });

  const MediterraneanDelight = await Restaurant.create({
    restaurantID: 7,
    restaurantName: "Mediterranean Delight",
    restaurantAddress: "789 Hillcrest Road, Pullman, WA",
    restaurantRating: 4.6,
  });

  const RedDragon = await Restaurant.create({
    restaurantID: 8,
    restaurantName: "Red Dragon",
    restaurantAddress: "345 Main Street, Pullman, WA",
    restaurantRating: 4.3,
  });

  const PhoWan = await Restaurant.create({
    restaurantID: 9,
    restaurantName: "Pho Van",
    restaurantAddress: "678 Cherry Lane, Pullman, WA",
    restaurantRating: 4.7,
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

  const MediterraneanCuisine = await Cuisine.create({
    cuisineType: "Mediterranean",
    restaurantID: 7,
  });

  const ChineseCuisine = await Cuisine.create({
    cuisineType: "Chinese",
    restaurantID: 8,
  });

  const VietnameseCuisine = await Cuisine.create({
    cuisineType: "Vietnamese",
    restaurantID: 9,
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

  const order2 = await Order.create({
    orderID: 2,
    userID: 102,
    restaurantID: 2,
    orderDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    orderPrice: 32.98,
    userAddress: "123 Baker's Street, Pullman, WA",
    status: "Delivered",
  });

  const order3 = await Order.create({
    orderID: 3,
    userID: 103,
    restaurantID: 4,
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    orderPrice: 22.98,
    userAddress: "456 Pine Lane, Pullman, WA",
    status: "Delivered",
  });

  const order4 = await Order.create({
    orderID: 4,
    userID: 104,
    restaurantID: 6,
    orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    orderPrice: 30.98,
    userAddress: "789 Oak Drive, Pullman, WA",
    status: "Delivered",
  });

  const order5 = await Order.create({
    orderID: 5,
    userID: 105,
    restaurantID: 3,
    orderDate: new Date(),
    orderPrice: 17.98,
    userAddress: "223 College Avenue, Pullman, WA",
    status: "Preparing",
  });

  const order6 = await Order.create({
    orderID: 6,
    userID: 106,
    restaurantID: 5,
    orderDate: new Date(),
    orderPrice: 14.98,
    userAddress: "445 Maple Street, Pullman, WA",
    status: "Out for Delivery",
  });

  const order7 = await Order.create({
    orderID: 7,
    userID: 101,
    restaurantID: 7,
    orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    orderPrice: 25.99,
    userAddress: "123 Baker's Street, Pullman, WA",
    status: "Delivered",
  });

  const order8 = await Order.create({
    orderID: 8,
    userID: 107,
    restaurantID: 8,
    orderDate: new Date(),
    orderPrice: 33.75,
    userAddress: "890 Elm Road, Pullman, WA",
    status: "Pending",
  });
  
  const order9 = await Order.create({
    orderID: 9,
    userID: 108,
    restaurantID: 9,
    orderDate: new Date(),
    orderPrice: 18.50,
    userAddress: "567 University Lane, Pullman, WA",
    status: "Cancelled",
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

  const lasagna = await Item.create({
    itemID: 15,
    restaurantID: 2,
    itemName: "Classic Lasagna",
    itemPrice: 17.99,
    itemDescription: "Layers of pasta, beef ragù, béchamel sauce, and mozzarella"
  });

  const tiramisu = await Item.create({
    itemID: 16,
    restaurantID: 2,
    itemName: "Tiramisu",
    itemPrice: 8.99,
    itemDescription: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone"
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

  const veganBurger = await Item.create({
    itemID: 17,
    restaurantID: 3,
    itemName: "Vegan Burger",
    itemPrice: 12.99,
    itemDescription: "Plant-based patty with vegan cheese and veggies"
  });

  const milkshake = await Item.create({
    itemID: 18,
    restaurantID: 3,
    itemName: "Chocolate Milkshake",
    itemPrice: 5.99,
    itemDescription: "Creamy chocolate milkshake topped with whipped cream"
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

  const spicyTunaRoll = await Item.create({
    itemID: 19,
    restaurantID: 4,
    itemName: "Spicy Tuna Roll",
    itemPrice: 11.99,
    itemDescription: "Fresh tuna with spicy mayo rolled in seaweed and rice"
  });

  const misoSoup = await Item.create({
    itemID: 20,
    restaurantID: 4,
    itemName: "Miso Soup",
    itemPrice: 3.99,
    itemDescription: "Traditional Japanese soup with tofu, seaweed, and green onion"
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

  const quesadilla = await Item.create({
    itemID: 21,
    restaurantID: 5,
    itemName: "Cheese Quesadilla",
    itemPrice: 7.99,
    itemDescription: "Flour tortilla filled with melted cheese, served with salsa"
  });

  const burrito = await Item.create({
    itemID: 22,
    restaurantID: 5,
    itemName: "Super Burrito",
    itemPrice: 9.99,
    itemDescription: "Large burrito with beans, rice, cheese, and your choice of protein"
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

  const GarlicNaan = await Item.create({
    itemID: 23,
    restaurantID: 6,
    itemName: "Garlic Naan",
    itemPrice: 3.99,
    itemDescription: "Freshly baked flatbread brushed with garlic butter"
  });

  const VegSamosas = await Item.create({
    itemID: 24,
    restaurantID: 6,
    itemName: "Vegetable Samosas",
    itemPrice: 5.99,
    itemDescription: "Crispy pastries filled with spiced potatoes and peas"
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

  const thaiSpringRolls = await Item.create({
    itemID: 13,
    restaurantID: 1,
    itemName: "Thai Spring Rolls",
    itemPrice: 7.99,
    itemDescription: "Crispy rolls filled with vegetables, served with sweet chili sauce"
  });

  const coconutSoup = await Item.create({
    itemID: 14,
    restaurantID: 1,
    itemName: "Tom Kha Soup",
    itemPrice: 9.99,
    itemDescription: "Coconut soup with mushrooms, lemongrass, and lime"
  });

  const gyros = await Item.create({
    itemID: 25,
    restaurantID: 7,
    itemName: "Gyros Plate",
    itemPrice: 14.99,
    itemDescription: "Traditional gyros with tzatziki sauce, pita bread, and greek salad"
  });

  const hummus = await Item.create({
    itemID: 26,
    restaurantID: 7,
    itemName: "Hummus & Pita",
    itemPrice: 7.99,
    itemDescription: "Creamy chickpea dip served with warm pita bread"
  });

  const kungPaoChicken = await Item.create({
    itemID: 27,
    restaurantID: 8,
    itemName: "Kung Pao Chicken",
    itemPrice: 13.99,
    itemDescription: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers"
  });

  const EggRolls = await Item.create({
    itemID: 28,
    restaurantID: 8,
    itemName: "Vegetable Egg Rolls",
    itemPrice: 6.99,
    itemDescription: "Crispy rolls filled with cabbage, carrots, and mushrooms"
  });

  const pho = await Item.create({
    itemID: 29,
    restaurantID: 9,
    itemName: "Beef Pho",
    itemPrice: 12.99,
    itemDescription: "Traditional Vietnamese noodle soup with beef and fresh herbs"
  });

  const springRolls = await Item.create({
    itemID: 30,
    restaurantID: 9,
    itemName: "Fresh Spring Rolls",
    itemPrice: 7.99,
    itemDescription: "Rice paper rolls with shrimp, vermicelli, and vegetables"
  });
}

//sync and setup database
//!!!!!! IMPORTANT MAKE SURE TO REMOVE  { force: true } BEFORE SUBMISSION?
//refreshes every time (does not store data) <- for this reason
sequelize.sync({ force: true }).then(() => {
  console.log("sequelize sync Completed...")
  setup().then(() => console.log("database setup complete! "))
})

app.listen(3000, function () {
  console.log("server listening...");
  console.log("server started in port 3000");
  });