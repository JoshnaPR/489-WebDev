# 489-WebDev
Our project, “Bite-A-Way,” is a web-based food delivery platform that combines the key features found in other popular food delivery apps like DoorDash, Uber Eats, Swiggy, and Zomato. Our platform allows its users to browse restaurants, place orders, track deliveries, and leave reviews.


# Team Members: 
Hannah Garcia, Joshna Prasanna Raghavan, Khushi Panchal & Trisha Teredesai


# Running Code:
Ensure that you have all packages/modules installed by running npm install. 
To start the application via localhost:3000 on the browser, run nodemon server.js in the terminal.


# Details:
- Users can browse for local restaurants. Users can be shown restaurants according to their distance from an entered delivery address. We can additionally implement a sorting system, such as within a 1-mile radius, 5-mile radius, etc.
- Restaurant profiles with pictures, customer reviews, and directions. For the simple implementation and examples, we can put in sample profiles for some restaurants or user reviews to provide a preview of what the site would look like.
  - To store all the restaurants, we’ll use a database in the backend. For the frontend, we’ll use an API to display the GPS (which will show driver location, ETA and other relevant information).
- Users can sort and filter based on price/ratings/cuisines/location (distance). 
- View the menu, select food items, and add to the cart. 
- Make “payment” & place an order for takeout or delivery.
  - We may implement an API for a payment method authentication (for example, for PayPal or RazorPay) showing the duplication of the payment method. As for the delivery and takeout, as mentioned above, we’ll implement a GPS API to display relevant delivery information.
- View order status once placed.
  - The order of customer’s status will follow chronological order: Payment Success, In Kitchen, In Delivery, Order Received, Review Order.
- After receiving an order, customers can choose to rate/review. 
  - Users can leave comments, rate, and send food pictures.


# Unique Selling Point: 
Users can view local reviews and “Star” reviews from local food experts and critics which help you make decisions. These reviews will help users order from the best-rated restaurants. Users will also be able to choose what they’d like to order according to what they are currently craving, as we aim to have a variety of featured restaurants. Our main target audience is busy professionals who don’t have time to cook for themselves or students who are having midnight cravings.


