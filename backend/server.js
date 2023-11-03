const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
connectDB();

app.use(express.json()); //To accept JSON data;

app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server Started on PORT ${PORT}`));
