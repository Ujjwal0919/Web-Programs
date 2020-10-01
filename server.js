const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("../backend/routes/auth");    //Routes

require("dotenv").config();

const app = express();

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected..");
  });

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);

//PORT
const PORT = process.env.PORT || 8000;

//Listening on
app.listen(PORT, () => {
  console.log("Server Started...");
});
