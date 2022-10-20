import { Layout } from '../layouts';
import { PrivateRoute } from '../routes';

export default function CardsPage() {
  return (
    <PrivateRoute requiredPermissions={['VIEW_USERS']}>
      <Layout>Team Management</Layout>
    </PrivateRoute>
  );
}
