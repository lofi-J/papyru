import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from './constances/routes';
import { Home, NotFound } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
