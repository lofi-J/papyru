import App from '@/App';
import { SidebarProvider } from '@/shared/context/sidebar-provider';
import { ThemeProvider } from '@/shared/context/theme-provider';
import '@style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from './component/toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <Toaster />
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
