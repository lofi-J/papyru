import { ROUTES } from '@/shared/constance/routes';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { SidebarItem } from './sidebar-item';
import SidebarStyle from './sidebar-style';

export default function Sidebar() {
  // TODO Type Safety + Command Type 검사 invoke generic
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const res = invoke('get_sidebar_tree_command');
    res
      .then(r => {
        console.log('사이드바 트리:', JSON.stringify(r, null, 2));
      })
      .catch(err => console.error(err));
  }, [update]);

  const handleFixOrphanedNotes = async () => {
    try {
      const result = await invoke('fix_orphaned_notes_command');
      console.log('고아 노트 수정 완료:', result);
      setUpdate(!update); // 트리 재조회
    } catch (err) {
      console.error('고아 노트 수정 실패:', err);
    }
  };

  return (
    <SidebarStyle>
      <button onClick={() => setUpdate(!update)}>Update</button>
      <button onClick={handleFixOrphanedNotes}>Fix Orphaned Notes</button>
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
