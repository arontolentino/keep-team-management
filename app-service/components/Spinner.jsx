import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = ({ size = 80 }) => {
  return <Loader type="Oval" color="black" height={size} width={size} />;
};
export default Spinner;
