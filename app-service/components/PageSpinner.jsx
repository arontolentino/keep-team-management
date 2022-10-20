import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Spinner from './Spinner';

const PageSpinner = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
};
export default PageSpinner;
