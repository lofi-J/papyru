import AppLayout from '@/component/layout/app-layout';
import { Home, Loading, NoteDetail, NotFound } from '@/page';
import { ROUTES } from '@/shared/constance/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.NOTE} element={<NoteDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
