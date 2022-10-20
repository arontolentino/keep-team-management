import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import PageSpinner from './PageSpinner';

const RestirctedRoute = ({ children, router }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <PageSpinner />;
  }

  if (isAuthenticated && user.isEmailVerified) {
    router.push('/boards');
    return <PageSpinner />;
  }

  if (isAuthenticated && !user.isEmailVerified) {
    router.push('/verify-email');
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    return children;
  }
};

export default withRouter(RestirctedRoute);
