import BookMarkIcon from '@/assets/icon/book-mark.svg?react';
import FileIcon from '@/assets/icon/file.svg?react';
import FolderIcon from '@/assets/icon/folder.svg?react';
import { ROUTES } from '@/shared/constance/routes';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router';

type SidebarItemProps = {
  iconType: 'file' | 'folder' | 'book-mark';
  title: string;
  path: (typeof ROUTES)[keyof typeof ROUTES];
};

export const SidebarItem = ({
  iconType,
  title,
  path,
  children,
}: PropsWithChildren & SidebarItemProps) => {
  const Icon = {
    file: FileIcon,
    folder: FolderIcon,
    'book-mark': BookMarkIcon,
  }[iconType];
  return (
    <Link className="f-r items-center px-1 text-body-2 ghost-button" to={path}>
      <Icon className="w-4 h-4" />
      <span className="text-red-500">{title}</span>
      {children}
    </Link>
  );
};
