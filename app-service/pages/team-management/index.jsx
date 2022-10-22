import { UsersList } from '../../features/users';
import { Layout } from '../../layouts';
import { PrivateRoute } from '../../routes';

export default function TeamManagementPage() {
  return (
    <PrivateRoute requiredPermissions={['VIEW_USERS']}>
      <Layout>
        <UsersList />
      </Layout>
    </PrivateRoute>
  );
}
