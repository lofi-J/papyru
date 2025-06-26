import { useNavigate } from 'react-router';
import Sparkles from '../../assets/sparkles.svg?react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <h1>Home</h1>
      <Sparkles className="size-4" fill="red" />
      <Sparkles className="size-10" fill="blue" />
      <button onClick={() => navigate('/123123')}>404</button>
    </div>
  );
}
