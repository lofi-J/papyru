import { ROUTES } from '@/shared/constance/routes';
import { SidebarItem } from './sidebar-item';
import SidebarStyle from './sidebar-style';

// TODO 사이드바 컨텐츠 추가 필요 Tauri command 추가 필요
export default function Sidebar() {
  return (
    <SidebarStyle>
      <SidebarItem iconType="file" title="Sidebar1" path={ROUTES.HOME}>
        Sidebar1
      </SidebarItem>
      <SidebarItem iconType="folder" title="Sidebar2" path={ROUTES.HOME}>
        Sidebar2
      </SidebarItem>
      <SidebarItem iconType="file" title="Sidebar3" path={ROUTES.HOME}>
        Sidebar3
      </SidebarItem>
    </SidebarStyle>
  );
}
