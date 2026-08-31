require("dotenv").config();
const express = require("express");

const testRoute = require("./routes/test")
const userRoute = require("./routes/user")

const swaggerDoc = require("./swaggerDoc/swaggerDoc")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
swaggerDoc(app);

app.use("/test" ,testRoute)
app.use("/user" , userRoute)
module.exports = app;