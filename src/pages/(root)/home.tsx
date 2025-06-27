import { useTheme } from '@/shared/context/theme-provider';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Home</h1>
      <h2>sqlite Test</h2>
      <h3>Current Theme: {theme}</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
