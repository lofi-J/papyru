import { lazy } from 'react';

export const Home = lazy(() => import('./(root)/home'));
export const NoteDetail = lazy(() => import('./note/note-detail'));
export const NotFound = lazy(() => import('@/shared/screen/not-found'));
export const Loading = lazy(() => import('@/shared/screen/loading'));
