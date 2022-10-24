const yup = require('yup');

const createCard = yup.object({
  body: yup.object({
    name: yup.string().required('Card name is required'),
    type: yup.string().required('Card type is required'),
    limitCurrency: yup.string().required('Card type is required'),
    limitAmount: yup.number.require('Limit amount is required'),
  }),
});

module.exports = { createCard };
