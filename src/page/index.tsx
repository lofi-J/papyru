import { lazy } from 'react';

export const Home = lazy(() => import('./(root)/home'));
export const NotFound = lazy(() => import('@/shared/screen/not-found'));
export const Loading = lazy(() => import('@/shared/screen/loading'));
