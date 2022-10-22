import { InviteUserForm } from '../../features/users';
import { Layout } from '../../layouts';
import { PrivateRoute } from '../../routes';

export default function InviteUserPage() {
  return (
    <PrivateRoute requiredPermissions={['VIEW_USERS']}>
      <Layout>
        <InviteUserForm />
      </Layout>
    </PrivateRoute>
  );
}
