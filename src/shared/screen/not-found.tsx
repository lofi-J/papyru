import { ROUTES } from '@/shared/constance/routes';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  console.error('404 not found');

  return (
    <div className="flex flex-col gap-2">
      <h1>404</h1>
      <h2>This page is not found.</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate(ROUTES.HOME)}>Back to Home</button>
    </div>
  );
}
