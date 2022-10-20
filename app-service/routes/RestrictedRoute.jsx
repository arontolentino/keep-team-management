import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { PageSpinner } from '../components';

const RestirctedRoute = ({ children, router }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <PageSpinner />;
  }

  if (isAuthenticated) {
    router.push('/cards');
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    return children;
  }
};

export default withRouter(RestirctedRoute);
