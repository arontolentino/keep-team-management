import { useEffect, useState } from 'react';
import { Button, FormInput, Formlabel } from '../../components';

export default function LoginFormManual() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const onFieldChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    const error = '';

    if (name === 'email') {
      if(!value) {
        error=" Email "
      }
      if (value.length < 2) {
        error = 'Email cannot be less the 2 characters';
      } else 
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      }
    }

    if (error) {
      errors[name] = error;
    } else {
      delete errors[name];
    }

    setFormErrors(errors);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  return (
    <div className="mt-8 space-y-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="#" className="font-medium text-black hover:text-gray-500">
            register for an account
          </a>
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <Formlabel htmlFor="email">Email address</Formlabel>
          <div className="mt-2">
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={onFieldChange}
            />
          </div>
        </div>

        <div>
          <Formlabel htmlFor="password">Password</Formlabel>
          <div className="mt-2">
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={onFieldChange}
            />
          </div>
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
          <Button type="submit" className="w-full" disabled={!isFormValid}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
