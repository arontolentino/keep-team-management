import { RegisterForm } from '../features/auth';
import { Layout } from '../layouts';
import { RestrictedRoute } from '../routes';

export default function RegisterPage() {
  return (
    <RestrictedRoute>
      <Layout>
        <RegisterForm />
      </Layout>
    </RestrictedRoute>
  );
}
