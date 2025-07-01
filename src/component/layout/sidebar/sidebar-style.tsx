import IconChevronDoubleLeft from '@/assets/icon/chevron-double-left.svg?react';
import IconHamburgerMenu from '@/assets/icon/hamburger-menu.svg?react';
import {
  DEFAULT_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  MIN_SIDEBAR_WIDTH,
} from '@/shared/constance/layout';
import { useSidebar } from '@/shared/context/sidebar-provider';
import { useResize } from '@/shared/hook/use-resize.hook';
import clsx from 'clsx';
import { forwardRef, PropsWithChildren, useRef, useState } from 'react';

export default function SidebarStyle({ children }: PropsWithChildren) {
  const { sidebarRef, isOpen, toggleSidebar, sidebarWidth, setSidebarWidth } =
    useSidebar();

  const { resizeHandleRef } = useResize({
    minWidth: MIN_SIDEBAR_WIDTH,
    maxWidth: MAX_SIDEBAR_WIDTH,
    setWidth: setSidebarWidth,
    initialWidth: DEFAULT_SIDEBAR_WIDTH,
  });

  return (
    <>
      <div
        ref={sidebarRef}
        className="fixed top-0 bottom-0 left-0 h-screen"
        style={{
          width: isOpen ? `${sidebarWidth}px` : '0px',
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {isOpen && (
            <>
              <div className="f-r justify-between items-center">
                <div className="f-r items-center font-dm-serif-text h-8 text-subtitle-2-b">
                  PAPYRU
                </div>
                <button onClick={toggleSidebar} className="ghost-button">
                  <IconChevronDoubleLeft className="w-7 h-7" />
                </button>
              </div>
              <div className="f-c">{children}</div>
            </>
          )}
        </div>
        <ReSizeHandle ref={resizeHandleRef} isVisible={isOpen} />
      </div>

      {!isOpen && (
        <div className="fixed top-0 left-0 z-50 p-2">
          <button onClick={toggleSidebar} className="ghost-button">
            <IconHamburgerMenu className="w-7 h-7" />
          </button>
        </div>
      )}
    </>
  );
}

// 사이드바 크기 조절 컴포넌트
const ReSizeHandle = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
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
      }, 100);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="absolute top-0 -right-1 bottom-0 w-2 z-50"
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          className={clsx(
            'w-[3px] h-full translate-x-[1.5px] bg-border z-40',
            isHover && 'cursor-col-resize bg-border-hover'
          )}
        />
      </div>
    );
  }
);
