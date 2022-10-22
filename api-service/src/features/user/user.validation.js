const yup = require('yup');

const getUsers = yup.object({
  query: yup.object({
    searchTerm: yup.string(),
    page: yup.number().required().default(1),
    pageSize: yup.number().required().default(10),
  }),
});

const inviteUser = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'invalid email formart'
      )
      .required('email is required'),
    role: yup.string().required('Role is required'),
  }),
});

module.exports = { getUsers, inviteUser };
