import Sidebar from '@/component/layout/sidebar/sidebar';
import { useSidebar } from '@/shared/context/sidebar-provider';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { isOpen, sidebarWidth } = useSidebar();

  return (
    <div className="relative flex h-screen">
      {/* left-0 sidebar */}
      <Sidebar />
      <main
        className="flex-1"
        style={{ marginLeft: isOpen ? sidebarWidth : 0 }}
      >
        {children}
      </main>
    </div>
  );
}
