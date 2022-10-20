const yup = require('yup');

const getUsers = yup.object({
  query: yup.object({
    page: yup.number().required().default(1),
    pageSize: yup.number().required().default(10),
  }),
});

module.exports = { getUsers };
