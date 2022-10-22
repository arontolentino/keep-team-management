import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { PageSpinner } from '../components';
import {
  selectIsLoading,
  selectIsAuthenticated,
  selectUser,
} from '../features/auth/auth.slice';
import { hasPermissions } from '../utils';

const PrivateRoute = ({ children, requiredPermissions }) => {
  const router = useRouter();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const isPermitted = requiredPermissions
    ? hasPermissions(user, requiredPermissions)
    : true;

  if (loading) {
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return <PageSpinner />;
  }

  if (!loading && isAuthenticated && isPermitted) {
    return children;
  } else {
    router.push('/cards');
    return <PageSpinner />;
  }
};

export default PrivateRoute;
