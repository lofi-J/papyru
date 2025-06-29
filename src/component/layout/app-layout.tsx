import Sidebar from '@/component/layout/sidebar/sidebar';
import { useSidebar } from '@/shared/context/sidebar-provider';
import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { isOpen, sidebarWidth } = useSidebar();

  return (
    <div className="relative flex h-screen">
      <Sidebar />
      <main className={clsx('flex-1', isOpen && `ml-[${sidebarWidth}px]`)}>
        {children}
      </main>
    </div>
  );
}
