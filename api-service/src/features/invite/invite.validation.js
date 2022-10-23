const yup = require('yup');

const getInvite = yup.object({
  params: yup.object({
    inviteId: yup
      .string()
      .uuid('Invalid invite id format')
      .required('Invite id is required'),
  }),
});

const getInvites = yup.object({
  query: yup.object({
    searchTerm: yup.string(),
    page: yup.number().required().default(1),
    pageSize: yup.number().required().default(10),
  }),
});

module.exports = { getInvite, getInvites };
