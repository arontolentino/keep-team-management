import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import PageSpinner from './PageSpinner';

const PrivateRoute = ({ children, router }) => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const loading = useSelector(({ auth }) => auth.loading);

  if (loading) {
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return <PageSpinner />;
  }

  if (!loading && isAuthenticated) {
    return children;
  }
};

export default withRouter(PrivateRoute);
