const httpStatus = require('http-status');
const { ApiError } = require('../utils');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    console.log(err);
    return next(new ApiError(httpStatus.BAD_REQUEST, err.message));
  }
};

module.exports = validate;
