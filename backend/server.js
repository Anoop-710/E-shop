import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB(); // Connect to MongoDB
const port = process.env.PORT || 5000;
const app = express();

// create a route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

//Any time we hit the route 'api/products' it will go to productRoutes

// get all products
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// // get single product
// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });

//Move the above product routes to productRoutes.js file and make use of express js instead
// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
