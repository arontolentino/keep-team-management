const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { errorHandler } = require('./middlewares/error');
const v1Routes = require('./routes/v1');
const { ApiError } = require('./utils');
const { jwtStrategy } = require('./config/passport');

dotenv.config();

const app = express();

app.use(cors());
app.options('*', cors());

// cookie parser
app.use(cookieParser());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

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
