import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { Button, FormikError, FormikField, Formlabel } from '../../components';
import { useDispatch } from 'react-redux';
import { registerAsync } from './auth.slice';

export default function RegisterForm() {
  const dispatch = useDispatch();

  const initialValues = { name: '', businessName: '', email: '', password: '' };
  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required('Business name is required'),
    name: Yup.string().required('Your name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, actions) => {
    await dispatch(await registerAsync(values));

    actions.setSubmitting(false);
  };

  return (
    <div className="mt-8 space-y-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-6">
              <div>
                <Formlabel htmlFor="businessName">Business name</Formlabel>
                <div className="mt-2">
                  <FormikField
                    id="businessName"
                    name="businessName"
                    type="text"
                    autoComplete="businessName"
                    required
                  />
                </div>
                <FormikError name="businessName" />
              </div>

              <div>
                <Formlabel htmlFor="name">Your name</Formlabel>
                <div className="mt-2">
                  <FormikField
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
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
                  Sign in
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
