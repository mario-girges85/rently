require("dotenv").config();
const express = require("express");
const cors = require("cors");

const testRoute = require("./routes/test");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const swaggerDoc = require("./swaggerDoc/swaggerDoc");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
swaggerDoc(app);

app.use("/test", testRoute);
app.use("/user", userRoute);
module.exports = app;
