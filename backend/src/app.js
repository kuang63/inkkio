/*Import express, cors, and routes*/
const express = require("express");
const cors = require("cors");
const metadataRoutes = require("./routes/MetadataRoutes.js");

/*Create an express app and use cors middleware*/
const app = express();
app.use(cors());

/*Use express.json() middleware to parse incoming JSON requests*/
app.use(express.json());

/*Use the metadata routes for requests to /metadata*/
app.use("/metadata", metadataRoutes);

/*Export the app for use in server.js*/
module.exports = app;