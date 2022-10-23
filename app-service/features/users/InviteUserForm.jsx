import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
  Button,
  FormikError,
  FormikField,
  Formlabel,
  FormSelect,
} from '../../components';
import { ROLE_TYPES } from './users.constants';
import { inviteUserAsync } from './users.slice';

function SuccessMessage({ invite, setInvite }) {
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/register?inviteId=${invite.inviteId}`;

  return (
    <>
      <h1 className="text-2xl font-bold">Share the invite link below</h1>

      <p className="mt-2 text-sm text-gray-500">
        For demo purposes, please copy the link below and sign out. Once you've
        signed out, paste the link on your browser to simulate an invited user
        visiting the provided link.
      </p>

      <div className="mt-6 p-6 bg-gray-100 rounded-md">
        <Link href={inviteLink}>
          <a className="underline hover:text-gray-500">{inviteLink}</a>
        </Link>
      </div>

      <div className="pt-5 flex justify-end space-x-4">
        <Button color="secondary" type="button" onClick={() => setInvite(null)}>
          Send another invite
        </Button>

        <Link href="/team-management">
          <a>
            <Button color="primary" type="submit">
              Go to team management
            </Button>
          </a>
        </Link>
      </div>
    </>
  );
}

function InviteForm({ router, setInvite }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    role: ROLE_TYPES.EMPLOYEE.value,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Your name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    role: Yup.string().required('Role is required'),
  });

  const onRoleChange = (e, setFieldValue) => {
    const value = JSON.parse(e.target.value).value;
    const name = e.target.name;

    setFieldValue(name, value);
  };

  const onInvite = async (values, actions) => {
    try {
      const newInvite = await dispatch(await inviteUserAsync(values));

      setInvite(newInvite);

      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Invite Team Member</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onInvite}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div>
                <p className="mt-2 text-sm text-gray-500">
                  After sending the invite, you will receive a link that you can
                  share with the newly invited member.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Formlabel htmlFor="name">Name</Formlabel>
                  <div className="mt-1">
                    <FormikField
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                    />
                  </div>
                  <FormikError name="name" />
                </div>

                <div className="sm:col-span-3">
                  <Formlabel htmlFor="email">Email</Formlabel>
                  <div className="mt-1">
                    <FormikField
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  <FormikError name="email" />
                </div>

                <div className="sm:col-span-3">
                  <Formlabel htmlFor="role">Role</Formlabel>
                  <div className="mt-1">
                    <FormSelect
                      name="role"
                      options={Object.values(ROLE_TYPES)}
                      onChange={(e) => onRoleChange(e, setFieldValue)}
                    />
                  </div>

                  <FormikError name="role" />
                </div>
              </div>

              <div className="pt-5 flex justify-end space-x-4">
                <Button
                  color="secondary"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Invite
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default function InviteUserForm() {
  const router = useRouter();

  const [invite, setInvite] = useState(null);

  return (
    <div className="mt-4">
      {!invite ? (
        <InviteForm setInvite={setInvite} router={router} />
      ) : (
        <SuccessMessage invite={invite} setInvite={setInvite} />
      )}
    </div>
  );
}
