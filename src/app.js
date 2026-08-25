require("dotenv").config();
const express = require("express");
const testRoute = require("./routes/test")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/test" ,testRoute)

module.exports = app;