import Sidebar from '@/component/layout/sidebar/sidebar';
import { MIN_MAIN_MARGIN } from '@/shared/constance/layout';
import { useSidebar } from '@/shared/context/sidebar-provider';
import { CSSProperties, PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  const { isOpen, sidebarWidth } = useSidebar();

  const mainStyle: CSSProperties = {
    marginLeft: isOpen ? sidebarWidth : MIN_MAIN_MARGIN,
    marginRight: isOpen ? sidebarWidth : MIN_MAIN_MARGIN,
  };

  return (
    <div className="relative flex h-screen">
      {/* left-0 sidebar */}
      <Sidebar />
      <main className="flex-1" style={mainStyle}>
        {children}
      </main>
    </div>
  );
}
