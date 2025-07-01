import { SidebarItem } from './sidebar-item';
import SidebarStyle from './sidebar-style';

// TODO 사이드바 컨텐츠 추가 필요 Tauri command 추가 필요
export default function Sidebar() {
  return (
    <SidebarStyle>
      <SidebarItem>Sidebar1</SidebarItem>
      <SidebarItem>Sidebar2</SidebarItem>
      <SidebarItem>Sidebar3</SidebarItem>
    </SidebarStyle>
  );
}
