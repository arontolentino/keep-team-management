import { ErrorMessage } from 'formik';

const FormikError = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(error) => (
        <div className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </div>
      )}
    </ErrorMessage>
  );
};
export default FormikError;
