require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");


const contactRoutes = require('./routes/contact.route');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use(express.json()); 

app.use('/api/contact',contactRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;


//swagger 

const fs = require("fs");
const path = require("path");

const baseSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname, "docs/base.json"))
); 

const authSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname, "docs/user.json"))
);

const contactSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname, "docs/contact.json"))
);

baseSpec.paths = {
    ...baseSpec.paths,
    ...authSpec.paths,
    ...contactSpec.paths,
};
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(baseSpec));
