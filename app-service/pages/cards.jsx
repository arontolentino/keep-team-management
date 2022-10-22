import { CardsList } from '../features/cards';
import { Layout } from '../layouts';
import { PrivateRoute } from '../routes';

export default function CardsPage() {
  return (
    <PrivateRoute>
      <Layout>
        <CardsList />
      </Layout>
    </PrivateRoute>
  );
}
