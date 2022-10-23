import { Field } from 'formik';
import { classNames } from '../../utils';

export default function FormikField({ className, ...props }) {
  return (
    <Field
      className={classNames(
        'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm disabled:bg-gray-200 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}
