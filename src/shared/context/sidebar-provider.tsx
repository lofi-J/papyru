import { DEFAULT_SIDEBAR_WIDTH } from '@/shared/constance/layout';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
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

  console.log(sidebarWidth);

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

  return (
    <SidebarContext.Provider
      value={{
        sidebarRef,
        isOpen,
        toggleSidebar,
        setSidebar,
        sidebarWidth,
        setSidebarWidth,
      }}
    >
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
