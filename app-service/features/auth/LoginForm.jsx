import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { Button, FormikError, FormikField, Formlabel } from '../../components';
import { useDispatch } from 'react-redux';
import { loginAsync } from './auth.slice';

export default function LoginForm() {
  const dispatch = useDispatch();

  const initialValues = { email: '', password: '', rememberMe: false };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, actions) => {
    await dispatch(await loginAsync(values));

    actions.setSubmitting(false);
  };

  return (
    <div className="mt-8 space-y-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register">
            <a className="font-medium text-black hover:text-gray-500">
              register for an account
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
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
