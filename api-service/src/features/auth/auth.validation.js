const yup = require('yup');

const emailValidation = yup
  .string()
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'invalid email formart'
  )
  .required('email is required');

const login = yup.object({
  body: yup.object({
    email: emailValidation,
    password: yup.string().required('Password is required'),
  }),
});

const register = yup.object({
  body: yup.object({
    email: emailValidation,
    password: yup.string().required('Password is required'),
    businessName: yup.string().required('Business name is required'),
  }),
});

module.exports = { login, register };
