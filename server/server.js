const express = require('express'); // allows us to handle http requests and responses
const mongoose = require('mongoose'); // allows us to connect to mongodb database
const cors = require('cors'); // allows us to connect to frontend from anywhere (cross origin resource sharing)
require('dotenv').config(); // allows us to use environment variables

const app = express(); // create express server

app.use(express.json()); // allows us to use content type of json in the api routes (req.body)
app.use(cors()); // allows us to use cors (protects our api from any cross origin errors when we try to connect to the frontend)

const mongoUri = process.env.MONGO_URI; // mongodb uri from mongodb atlas

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
}); // connect to mongodb database created on mongodb atlas (cloud database) using mongoose
// if connection is successful, log success message, else log error message
// useNewUrlParser and useUnifiedTopology are options that are required to be set to true to avoid deprecation warnings

const PORT = process.env.PORT // port to run server on

const Todo = require('./models/Todo'); // import Todo model

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); // start server on local port
