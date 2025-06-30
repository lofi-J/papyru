import IconChevronDoubleRight from '@/assets/icon/chevron-double-right.svg?react';
import { useSidebar } from '@/shared/context/sidebar-provider';
import { useResize } from '@/shared/hook/use-resize.hook';
import clsx from 'clsx';
import { forwardRef, PropsWithChildren, useRef, useState } from 'react';

export default function SidebarStyle({ children }: PropsWithChildren) {
  const { sidebarRef, isOpen, toggleSidebar, sidebarWidth, setSidebarWidth } =
    useSidebar();
  const { resizeHandleRef } = useResize({
    minWidth: 200,
    maxWidth: 400,
    setWidth: setSidebarWidth,
  });

  return (
    <div
      ref={sidebarRef}
      style={{ width: isOpen ? `${sidebarWidth}px` : '0px' }}
      className="fixed top-0 bottom-0 left-0 h-screen"
    >
      <div className="relative w-full h-full">
        <ReSizeHandle ref={resizeHandleRef} />
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
    </div>
  );
}

const ReSizeHandle = forwardRef<HTMLDivElement>((_, ref) => {
  const [isHover, setIsHover] = useState(false);

  const hoverTimer = useRef<number>(undefined);

  const mouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setIsHover(false);
  };

  const mouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHover(true);
    }, 300);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className="absolute top-0 right-0 bottom-0 w-[8px] translate-x-[4px] z-50"
    >
      <div
        className={clsx(
          'w-1 h-full translate-x-[2px] bg-border',
          isHover && 'cursor-col-resize bg-red-200'
        )}
      />
    </div>
  );
});
