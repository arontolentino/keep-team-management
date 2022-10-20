import { Field } from 'formik';
import FormLabel from './FormLabel';

const FormikCheckbox = (props) => {
  const { children, name, id } = props;

  return (
    <div className="flex items-center">
      <Field
        id={id}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
      />

      <label className="ml-2 block text-sm text-gray-900" htmlFor={name}>
        {children}
      </label>
    </div>
  );
};

export default FormikCheckbox;
