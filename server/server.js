import express from 'express'; // allows us to handle http requests and responses
import mongoose from 'mongoose'; // allows us to connect to a mongodb database
import cors from 'cors'; // allows us to connect to frontend from anywhere (cross origin resource sharing)
import dotenv from 'dotenv'; // allows us to use environment variables
import { toDoRouter } from './routes/toDoRoutes.js' // import router from todoRoutes.js

dotenv.config();

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

app.use('/to-do-list', toDoRouter); // use router from todoRoutes.js
app.use('/to-do/new', toDoRouter); // use router from todoRoutes.js
app.use('/edit/:id', toDoRouter); // use router from todoRoutes.js
app.use('/complete/:id', toDoRouter); // use router from todoRoutes.js
app.use('/delete/:id', toDoRouter); // use router from todoRoutes.js

const PORT = process.env.PORT // port to run server on

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); // start server on local port