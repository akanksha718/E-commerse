const express = require('express');
const connectDB = require('./config/db');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const authrouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-routes');
const shopProductRouter = require("./routes/shop/products-routes");
const shopCartRouter = require('./routes/shop/cart-routes');
require('dotenv').config();
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
}))
app.use(express.json());
app.use(cookieparser());
app.use("/api/auth", authrouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});