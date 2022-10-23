import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import {
  Button,
  FormikError,
  FormikField,
  Formlabel,
  PageSpinner,
} from '../../components';
import { useDispatch } from 'react-redux';
import { activateAsync, getInviteAsync, registerAsync } from './auth.slice';
import { useEffect, useState } from 'react';

export default function RegisterForm({ inviteId }) {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    name: '',
    businessName: '',
    email: '',
    password: '',
  });
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (inviteId) {
        try {
          const fetchedInvite = await dispatch(await getInviteAsync(inviteId));

          setInvite(fetchedInvite);
        } catch (error) {
          setInvite(null);
          setLoading(false);
        }
      }
    })();
  }, [inviteId]);

  useEffect(() => {
    if (invite) {
      setInitialValues({
        name: invite.name,
        email: invite.email,
        password: '',
      });

      setLoading(false);
    }
  }, [invite]);

  const registerValidationSchema = Yup.object().shape({
    businessName: Yup.string().required('Business name is required'),
    name: Yup.string().required('Your name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const activateValidationSchema = Yup.object().shape({
    name: Yup.string().required('Your name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onRegister = async (values, actions) => {
    await dispatch(await registerAsync(values));

    actions.setSubmitting(false);
  };

  const onActivate = async (values, actions) => {
    await dispatch(await activateAsync(values, inviteId));

    actions.setSubmitting(false);
  };

  if (loading) {
    return <PageSpinner />;
  }

  const isActivating = !loading && inviteId && invite;

  return (
    <div className="mt-8 space-y-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {isActivating ? (
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Activate your account
          </h2>
        ) : (
          <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/login">
                <a className="font-medium text-black hover:text-gray-500">
                  sign in to your account
                </a>
              </Link>
            </p>
          </>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={
          invite ? activateValidationSchema : registerValidationSchema
        }
        onSubmit={invite ? onActivate : onRegister}
        enableReinitialize
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-6">
              {!isActivating && (
                <div>
                  <Formlabel htmlFor="businessName">Business name</Formlabel>
                  <div className="mt-2">
                    <FormikField
                      id="businessName"
                      name="businessName"
                      type="text"
                      autoComplete="businessName"
                      disabled={invite}
                      required
                    />
                  </div>
                  <FormikError name="businessName" />
                </div>
              )}

              <div>
                <Formlabel htmlFor="name">Your name</Formlabel>
                <div className="mt-2">
                  <FormikField
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    disabled={invite}
                    required
                  />
                </div>
                <FormikError name="name" />
              </div>

              <div>
                <Formlabel htmlFor="email">Email address</Formlabel>
                <div className="mt-2">
                  <FormikField
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    disabled={invite}
                    required
                  />
                </div>
                <FormikError name="email" />
              </div>

              <div>
                <Formlabel htmlFor="password">Password</Formlabel>
                <div className="mt-2">
                  <FormikField
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <FormikError name="password" />
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={!isValid}>
                  {isActivating ? 'Activate' : 'Register'}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
