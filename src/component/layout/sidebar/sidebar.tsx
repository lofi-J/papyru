import { ROUTES } from '@/shared/constance/routes';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { SidebarItem } from './sidebar-item';
import SidebarStyle from './sidebar-style';

export default function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ['sidebar'],
    queryFn: () => invoke('get_sidebar_tree_command'),
  });

  console.log(JSON.stringify(data, null, 2));
  console.log(isLoading);

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
