// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database'); 
const UserRoutes = require('./routes/UserRoutes');
const RestaurantRoutes = require('./routes/RestaurantRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes');
const CartRoutes = require('./routes/CartRoutes');
const OrderRoutes = require('./routes/OrderRoutes'); 


const app = express();
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/users', UserRoutes);

// Use restaurant routes
app.use('/restaurants', RestaurantRoutes);

// Use menu item routes
app.use('/menu', MenuItemRoutes);

// Use cart routes
app.use('/cart', CartRoutes);

// Use orders routes
app.use('/orders', OrderRoutes);

// Sync database (creates tables if they don't exist)
sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Database sync failed:', err));

app.get('/', (req, res) => {
    res.send('Bite-a-Way Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
