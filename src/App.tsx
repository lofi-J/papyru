import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from './constances/routes';
import { Home, NotFound } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
