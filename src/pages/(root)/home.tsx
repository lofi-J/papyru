import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <h1>Home</h1>
      <button onClick={() => navigate('/123123')}>404</button>
    </div>
  );
}
