import { Layout } from '../layouts';
import { PrivateRoute } from '../routes';

export default function CardsPage() {
  return (
    <PrivateRoute>
      <Layout>Cards</Layout>
    </PrivateRoute>
  );
}
