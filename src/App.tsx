import AppLayout from '@/component/layout/app-layout';
import { Home, Loading, NotFound } from '@/page';
import { ROUTES } from '@/shared/constance/routes';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}
