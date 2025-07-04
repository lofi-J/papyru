import { DEFAULT_SIDEBAR_WIDTH } from '@/shared/constance/layout';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface SidebarContext {
  sidebarRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  toggleSidebar: () => void;
  setSidebar: (state: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

const SidebarContext = createContext<SidebarContext>({} as SidebarContext);

export function SidebarProvider({ children }: PropsWithChildren) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const setSidebar = (state: boolean) => setIsOpen(state);

  useEffect(() => {
    const handleResize = () => {
      if (!sidebarRef.current) return;

      setSidebarWidth(sidebarRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, sidebarRef]);

  const contextValue = useMemo(
    () => ({
      sidebarRef,
      isOpen,
      toggleSidebar,
      setSidebar,
      sidebarWidth,
      setSidebarWidth,
    }),
    [isOpen, sidebarWidth]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
