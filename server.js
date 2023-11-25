require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const corsOptions = require('./config/corsOptions');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 3500;

console.log(PORT);

connectDB();
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));
app.use('/user',require("./routes/userRoutes"))
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
