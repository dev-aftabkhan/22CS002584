const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require("./middleware/logger");
const urlRoutes = require("./routes/urlRoutes");
 
 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


app.use("/api/url", urlRoutes);

const { redirectUrl } = require("./controllers/urlController");
app.get("/:shortcode", redirectUrl);

module.exports = app;
