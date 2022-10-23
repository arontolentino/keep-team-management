const yup = require('yup');

const login = yup.object({
  body: yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'invalid email formart'
      )
      .required('email is required'),
    password: yup.string().required('Password is required'),
  }),
});

const register = yup.object({
  body: yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'invalid email formart'
      )
      .required('email is required'),
    password: yup.string().required('Password is required'),
    businessName: yup.string().required('Business name is required'),
  }),
});

const activate = yup.object({
  params: yup.object({
    inviteId: yup
      .string()
      .uuid('Invalid invite id format')
      .required('Invite id is required'),
  }),
  body: yup.object({
    password: yup.string().required('Password is required'),
  }),
});

module.exports = { login, register, activate };
