import { ROUTES } from '@/constances/routes';
import { Home, Loading, NotFound } from '@/pages';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
