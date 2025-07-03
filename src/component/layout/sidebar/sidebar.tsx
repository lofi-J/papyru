import { ROUTES } from '@/shared/constance/routes';
import { invoke } from '@tauri-apps/api/core';
import { SidebarItem } from './sidebar-item';
import SidebarStyle from './sidebar-style';

export default function Sidebar() {
  // TODO Type Safety + Command Type 검사 invoke generic
  const res = invoke('get_sidebar_tree_command');
  res
    .then(r => {
      console.log(JSON.stringify(r, null, 2));
    })
    .catch(err => console.error(err));

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
