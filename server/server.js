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

export function errorHandler(err, req, res, next) { // custom error handling middleware
  console.error(err.stack); // log the error to the console for debugging purposes (err.stack is the stack trace of the error which means the error message and the line number where the error occurred)

  // handle different types of errors and send appropriate responses
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) { // handle SyntaxError (JSON parsing error due to incorrect JSON format in the request body, for example if the request body is missing a comma or a closing bracket) 
      return res.status(400).json({ message: 'Bad request' }); 
  } else if (err.name === 'ValidationError') { // handle Joi validation errors which are thrown when the request body does not match the schema, for example if the text of the todo is missing or if the text of the todo is longer than 100 characters
      return res.status(400).json({ message: err.details[0].message });
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') { // handle invalid ObjectId errors which are thrown when the id in the request parameters is not a valid ObjectId which means it is not a valid id
      return res.status(404).send('No todo with that id');
  } else if (err.name === 'MongoError' && err.code === 11000) { // handle duplicate key errors which are thrown when the user tries to create a todo with the same text as an existing todo
    return res.status(409).json({ message: 'Duplicate key error' });
  } else { // handle all other errors
      return res.status(500).json({ message: 'Something went wrong' });
  }
}

app.use(errorHandler); // use the custom error handling middleware


const PORT = process.env.PORT // port to run server on

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); // start server on local port