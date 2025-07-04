import SidebarStyle from './sidebar-style';
import { TreeRoot } from './tree/tree-root';

export default function Sidebar() {
  return (
    <SidebarStyle>
      <TreeRoot />
    </SidebarStyle>
  );
}
