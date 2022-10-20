const express = require('express');
const dotenv = require('dotenv');
const httpStatus = require('http-status');
const { errorHandler } = require('./middlewares/error');
const v1Routes = require('./routes/v1');
const { ApiError } = require('./utils');

dotenv.config();

const app = express();

// parse json request body
app.use(express.json());

// v1 api routes
app.use('/v1', v1Routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Handle error
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is running at port ${process.env.PORT}`)
);
