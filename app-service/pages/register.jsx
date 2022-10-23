import { useRouter } from 'next/router';
import { RegisterForm } from '../features/auth';
import { Layout } from '../layouts';
import { RestrictedRoute } from '../routes';

export default function RegisterPage() {
  const router = useRouter();
  const { inviteId } = router.query;

  return (
    <RestrictedRoute>
      <Layout>
        <RegisterForm inviteId={inviteId} />
      </Layout>
    </RestrictedRoute>
  );
}
