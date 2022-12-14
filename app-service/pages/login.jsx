import { LoginForm } from '../features/auth';
import { Layout } from '../layouts';
import { RestrictedRoute } from '../routes';

export default function LoginPage() {
  return (
    <RestrictedRoute>
      <Layout>
        <LoginForm />
      </Layout>
      //{' '}
    </RestrictedRoute>
  );
}
