import { useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { PageSpinner } from '../components';
import {
  selecteIsLoading,
  selectIsAuthenticated,
  selectUser,
} from '../features/auth/auth.slice';
import { hasPermissions } from '../utils';

const PrivateRoute = ({ children, router, requiredPermissions }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selecteIsLoading);
  const user = useSelector(selectUser);

  if (loading) {
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return <PageSpinner />;
  }

  if (
    !loading &&
    isAuthenticated &&
    hasPermissions(user, requiredPermissions)
  ) {
    return children;
  } else {
    router.push('/cards');
    return <PageSpinner />;
  }
};

export default withRouter(PrivateRoute);
