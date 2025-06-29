import IconChevronDoubleRight from '@/assets/icon/chevron-double-right.svg?react';
import { useSidebar } from '@/shared/context/sidebar-provider';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export default function SidebarStyle({ children }: PropsWithChildren) {
  const { sidebarRef, isOpen, toggleSidebar, sidebarWidth } = useSidebar();

  return (
    <div
      ref={sidebarRef}
      style={{ width: isOpen ? `${sidebarWidth}px` : '0px' }}
      className={clsx(
        'fixed top-0 bottom-0 left-0 h-screen',
        'transition-all duration-300 ease-in-out',
        ' border-r border-gray-200',
        'overflow-hidden',
        'z-40'
      )}
    >
      <div className="f-r justify-between items-center">
        <div className="f-r items-center font-dm-serif-text h-8 text-subtitle-2-b">
          PAPYRU
        </div>
        <button onClick={toggleSidebar}>
          <IconChevronDoubleRight className="w-5 h-5" />
        </button>
      </div>
      <div className="f-c">{children}</div>
    </div>
  );
}
